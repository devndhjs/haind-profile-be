import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ default: 0 })
  quantity: number;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  created_at: Date;
}
