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

  @CreateDateColumn()
  sale_date: Date;

  @Column('numeric', { precision: 12, scale: 2 })
  total_amount: number;
}
