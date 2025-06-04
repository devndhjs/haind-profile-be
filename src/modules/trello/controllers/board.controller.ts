import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BoardService } from '../services/board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findFullBoard(+id);
  }
}
