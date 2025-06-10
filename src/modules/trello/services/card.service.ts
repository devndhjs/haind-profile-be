import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from '../dto/create-card.dto';
import { Card } from '../entities/card.entity';
import { List } from '../entities/list.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const list = await this.listRepo.findOneBy({ id: createCardDto.listId });
    if (!list)
      throw new NotFoundException(`List ${createCardDto.listId} not found`);

    const card = this.cardRepo.create({
      ...createCardDto,
      list,
    });

    return this.cardRepo.save(card);
  }

  findAll() {
    return this.cardRepo.find();
  }

  findOne(id: number) {
    return this.cardRepo.findOneBy({ id });
  }
}
