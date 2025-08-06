import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChecklistItemDto } from '../dto/create-check-list-item.dto';
import { Card } from '../entities/card.entity';
import { ChecklistItem } from '../entities/check-list-item.entity';
@Injectable()
export class CheckListItemService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
    @InjectRepository(ChecklistItem)
    private readonly listItemRepo: Repository<ChecklistItem>,
  ) {}

  async create(createCardDto: CreateChecklistItemDto) {
    const card = await this.cardRepo.findOneBy({
      id: createCardDto.cardId,
    });
    if (!card)
      throw new NotFoundException(`List ${createCardDto.cardId} not found`);

    const item = this.listItemRepo.create({
      ...createCardDto,
      card,
    });

    return this.listItemRepo.save(item);
  }

  findAll() {
    return this.listItemRepo.find();
  }

  findOne(id: number) {
    return this.listItemRepo.findOneBy({ id });
  }
}
