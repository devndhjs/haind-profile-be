import { PartialType } from '@nestjs/swagger';
import { CreateChecklistItemDto } from './create-check-list-item.dto';

export class UpdateCheckListItemDto extends PartialType(
  CreateChecklistItemDto,
) {}
