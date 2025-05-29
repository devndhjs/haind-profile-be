import { Card } from "src/modules/card/entities/card.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";


@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @ManyToOne(() => Card, (card) => card.comments)
  card: Card;

  @CreateDateColumn()
  createdAt: Date;
}
