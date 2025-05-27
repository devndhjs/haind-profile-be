// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entites/product.entity';
import { Sale } from './entites/sale.entity';
import { SaleItem } from './entites/sale-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Sale, SaleItem])],
  providers: [],
  controllers: [],
})
export class UserModule {}
