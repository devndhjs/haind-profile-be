import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as oci from 'oci-sdk';
import { ObjectStorageClient } from 'oci-objectstorage';
import { PutObjectRequest } from 'oci-objectstorage/lib/request';

@Injectable()
export class OCIStorageService {
  private objectStorageClient: ObjectStorageClient; // ✅ Đúng
  private namespace: string;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    // const privateKeyPath = this.configService.get('OCI_PRIVATE_KEY_PATH');
    const privateKey = this.configService
      .get('OCI_PRIVATE_KEY')
      ?.replace(/\\n/g, '\n');
    // ||
    // fs.readFileSync(path.resolve(privateKeyPath), 'utf8');

    const SimpleAuthenticationDetailsProvider =
      oci.common.SimpleAuthenticationDetailsProvider;

    const provider = new SimpleAuthenticationDetailsProvider(
      this.configService.get<string>('OCI_TENANCY_ID') as string,
      this.configService.get<string>('OCI_USER_ID') as string,
      this.configService.get<string>('OCI_KEY_FINGERPRINT') as string,
      privateKey as string,
      null, // Passphrase (nếu có thì thay thế bằng string)
      oci.common.Region.fromRegionId(
        this.configService.get<string>('OCI_REGION') as string,
      ), // ✅ Chuyển đổi string thành Region
    );

    this.objectStorageClient = new ObjectStorageClient({
      authenticationDetailsProvider: provider,
    });

    this.namespace = this.configService.get('OCI_NAMESPACE') as string;
    this.bucketName = this.configService.get('OCI_BUCKET_NAME') as string;
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    const uniqueName = `${Date.now()}-${file.originalname}`; // Thêm timestamp
    const putObjectRequest: PutObjectRequest = {
      namespaceName: this.namespace,
      bucketName: this.bucketName,
      objectName: uniqueName,
      putObjectBody: file.buffer,
      contentLength: file.size,
    };

    await this.objectStorageClient.putObject(putObjectRequest);
    return await this.createPreAuthRequest(uniqueName);
  }

  async createPreAuthRequest(fileName: string): Promise<string> {
    const request: oci.objectstorage.requests.CreatePreauthenticatedRequestRequest =
      {
        namespaceName: this.namespace, // Thêm namespace
        bucketName: this.bucketName,
        createPreauthenticatedRequestDetails: {
          name: `PAR-${fileName}`, // Tên định danh của PAR
          // objectName: fileName, // Chỉ nhận string, không phải array
          accessType:
            oci.objectstorage.models.CreatePreauthenticatedRequestDetails
              .AccessType.AnyObjectRead,
          timeExpires: new Date(Date.now() + 3600000), // 1 giờ hết hạn
        },
      };

    const response =
      await this.objectStorageClient.createPreauthenticatedRequest(request);
    return `https://objectstorage.${this.configService.get('OCI_REGION')}.oraclecloud.com${response.preauthenticatedRequest.accessUri}`;
  }
}
