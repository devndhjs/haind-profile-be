import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from '../dto/create-card.dto';
import { Card } from '../entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
  ) {}

  create(createCardDto: CreateCardDto) {
    return this.cardRepo.save(createCardDto);
  }

  findAll() {
    return this.cardRepo.find();
  }

  findOne(id: number) {
    return this.cardRepo.findOneBy({ id });
  }
}
