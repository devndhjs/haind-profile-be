import { Module } from '@nestjs/common';
import { OCIStorageService } from './oci-storage.service';
import { OCIStorageController } from './oci-storage.controller';

@Module({
  controllers: [OCIStorageController],
  providers: [OCIStorageService],
})
export class OciStorageModule {}
