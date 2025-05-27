import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sale_items')
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sale_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column('numeric', { precision: 10, scale: 2 })
  price_at_sale: number;
}
