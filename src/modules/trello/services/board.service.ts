import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Board } from '../entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepo: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepo.save(createBoardDto);
  }

  findAll() {
    return this.boardRepo.find();
  }

  async findFullBoard(id: number): Promise<Board> {
    const board = await this.boardRepo.findOne({
      where: { id },
      relations: [
        'lists',
        'lists.cards',
        'lists.cards.comments',
        'lists.cards.checklistItems',
      ],
      order: {
        lists: {
          position: 'ASC',
          cards: {
            position: 'ASC',
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundException(`Board ${id} not found`);
    }

    return board;
  }
}
