import { Board } from 'src/modules/trello/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Board, (board) => board.owner)
  boards: Board[];

  @CreateDateColumn()
  createdAt: Date;
}
