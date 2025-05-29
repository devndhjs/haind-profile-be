import { Board } from "src/modules/board/entities/board.entity";
import { Card } from "src/modules/card/entities/card.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  position: number; // Dùng để sắp xếp

  @ManyToOne(() => Board, (board) => board.lists)
  board: Board;

  @OneToMany(() => Card, (card) => card.list, { cascade: true })
  cards: Card[];
}
