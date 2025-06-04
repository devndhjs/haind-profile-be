import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardController } from './controllers/board.controller';
import { BoardService } from './services/board.service';
import { CardController } from './controllers/card.controller';
import { CheckListItemController } from './controllers/check-list-item.controller';
import { CommentController } from './controllers/comment.controller';
import { ListController } from './controllers/list.controller';
import { CardService } from './services/card.service';
import { CheckListItemService } from './services/check-list-item.service';
import { CommentService } from './services/comment.service';
import { ListService } from './services/list.service';
import { List } from './entities/list.entity';
import { Card } from './entities/card.entity';
import { ChecklistItem } from './entities/check-list-item.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Card, ChecklistItem, Comment, List]),
  ],
  controllers: [
    BoardController,
    CardController,
    CheckListItemController,
    CommentController,
    ListController,
  ],
  providers: [
    BoardService,
    CardService,
    CheckListItemService,
    CommentService,
    ListService,
  ],
})
export class TrelloModule {}
