import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'sale_date' })
  saleDate: Date;

  @Column('numeric', { precision: 12, scale: 2, name: 'total_amount' })
  totalAmount: number;
}
