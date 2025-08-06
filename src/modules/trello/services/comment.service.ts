import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Card } from '../entities/card.entity';
import { Comment } from '../entities/comment.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async create(createCardDto: CreateCommentDto) {
    const card = await this.cardRepo.findOneBy({
      id: createCardDto.cardId,
    });
    if (!card)
      throw new NotFoundException(`List ${createCardDto.cardId} not found`);

    const item = this.commentRepo.create({
      ...createCardDto,
      card,
    });

    return this.commentRepo.save(item);
  }
  findAll() {
    return this.commentRepo.find();
  }

  findOne(id: number) {
    return this.commentRepo.findOneBy({ id });
  }
}
