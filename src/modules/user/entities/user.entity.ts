import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Đánh dấu class này là Entity
export class User {
  @PrimaryGeneratedColumn() // Trường ID sẽ tự động được tạo
  id: number;

  @Column() // Trường name
  name: string;

  @Column() // Trường email
  email: string;
}
