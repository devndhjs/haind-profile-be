import { Card } from "src/modules/card/entities/card.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChecklistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: false })
  isDone: boolean;

  @ManyToOne(() => Card, (card) => card.checklistItems)
  card: Card;
}
