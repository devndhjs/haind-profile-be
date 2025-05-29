import { ChecklistItem } from "src/modules/check-list-item/entities/check-list-item.entity";
import { List } from "src/modules/list/entities/list.entity";
import { Comment } from "src/modules/comment/entities/comment.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  dueDate: Date;

  @Column()
  position: number; // Dùng để sắp xếp trong list

  @ManyToOne(() => List, (list) => list.cards)
  list: List;

  @OneToMany(() => Comment, (comment) => comment.card, { cascade: true })
  comments: Comment[];

  @OneToMany(() => ChecklistItem, (item) => item.card, { cascade: true })
  checklistItems: ChecklistItem[];

  @CreateDateColumn()
  createdAt: Date;
}
