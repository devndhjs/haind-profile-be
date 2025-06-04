import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OciStorageModule } from './modules/oci-storage/oci-storage.module';
import { TrelloModule } from './modules/trello/trello.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    OciStorageModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: Boolean(process.env.DB_SSL),
      autoLoadEntities: true,
      synchronize: false,
    }),
    TrelloModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
