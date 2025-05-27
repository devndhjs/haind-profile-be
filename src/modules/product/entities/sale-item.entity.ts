import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sale_items')
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sale_id' })
  saleId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column()
  quantity: number;

  @Column('numeric', { precision: 10, scale: 2, name: 'price_at_sale' })
  priceAtSale: number;
}
