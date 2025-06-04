import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from '../dto/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from '../entities/list.entity';
import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
    @InjectRepository(Board)
    private readonly boardRepo: Repository<Board>,
  ) {}

  async create(dto: CreateListDto): Promise<List> {
    const board = await this.boardRepo.findOneBy({ id: dto.boardId });
    if (!board) throw new NotFoundException(`Board ${dto.boardId} not found`);

    const list = this.listRepo.create({
      title: dto.title,
      position: dto.position,
      board: board,
    });

    return this.listRepo.save(list);
  }

  findAll() {
    return this.listRepo.find();
  }

  findOne(id: number) {
    return this.listRepo.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
