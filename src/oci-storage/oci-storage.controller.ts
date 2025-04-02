import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OCIStorageService } from './oci-storage.service';

@Controller('images')
export class OCIStorageController {
  constructor(private readonly ociStorageService: OCIStorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.ociStorageService.uploadFile(file);
    return { url: fileUrl };
  }

  @Get(':filename')
  async getImage(@Param('filename') filename: string) {
    return this.ociStorageService.createPreAuthRequest(filename);
  }
}
