import { Module } from '@nestjs/common';
import { CheckListItemService } from './check-list-item.service';
import { CheckListItemController } from './check-list-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistItem } from './entities/check-list-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistItem])],
  controllers: [CheckListItemController],
  providers: [CheckListItemService],
})
export class CheckListItemModule {}
