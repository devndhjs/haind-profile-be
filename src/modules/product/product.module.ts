// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { SalesController } from './controllers/sales.controller';
import { SalesService } from './services/sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Sale, SaleItem])],
  providers: [SalesService],
  controllers: [SalesController],
})
export class ProductModule {}
