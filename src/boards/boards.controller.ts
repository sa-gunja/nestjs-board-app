import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDTO } from './DTO/create-board.dto';
import { BoardStatusValidationPipe } from './Pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  // 생성자에 접근제한자(private, public, protected 등을 사용하여 인수를 암묵적으로 프로퍼티로 만들어 준다)
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Board {
    return this.boardService.createBoard(createBoardDTO);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    return this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoard(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardService.updateBoardStatus(id, status);
  }
}
