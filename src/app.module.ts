import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OciStorageModule } from './modules/oci-storage/oci-storage.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './modules/board/board.module';
import { CardModule } from './modules/card/card.module';
import { CheckListItemModule } from './modules/check-list-item/check-list-item.module';
import { CommentModule } from './modules/comment/comment.module';
import { ListModule } from './modules/list/list.module';
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
    BoardModule,
    CardModule,
    CheckListItemModule,
    CommentModule,
    ListModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
