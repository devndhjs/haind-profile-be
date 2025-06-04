import { List } from 'src/modules/trello/entities/list.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.boards)
  owner: User;

  @OneToMany(() => List, (list) => list.board, { cascade: true })
  lists: List[];

  @CreateDateColumn()
  createdAt: Date;
}
