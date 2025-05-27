import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sale } from '../entities/sale.entity';
import { SaleItem } from '../entities/sale-item.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,

    @InjectRepository(SaleItem)
    private readonly saleItemRepo: Repository<SaleItem>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getTotalRevenue(startDate: Date, endDate: Date): Promise<number> {
    const result = await this.saleRepo
      .createQueryBuilder('sale')
      .select('SUM(sale.totalAmount)', 'total')
      .where('sale.saleDate BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      })
      .getRawOne();

    return Number(result.total) || 0;
  }

  async getProductSalesReport(startDate: Date, endDate: Date) {
    return this.saleItemRepo
      .createQueryBuilder('saleItem')
      .select('saleItem.productId', 'productId')
      .addSelect('SUM(saleItem.quantity)', 'totalQuantity')
      .addSelect(
        'SUM(saleItem.priceAtSale * saleItem.quantity)',
        'totalRevenue',
      )
      .innerJoin('sales', 'sale', 'sale.id = saleItem.saleId') // CHỈNH LẠI ĐOẠN NÀY
      .where('sale.sale_date BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      })
      .groupBy('saleItem.productId')
      .getRawMany();
  }

  // Lấy danh sách bán hàng với chi tiết sản phẩm
  async getSalesWithItems() {
    return this.saleRepo
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale_items', 'saleItem', 'saleItem.sale_id = sale.id')
      .leftJoinAndSelect(
        'products',
        'product',
        'product.id = saleItem.product_id',
      )
      .getMany();
  }
}
