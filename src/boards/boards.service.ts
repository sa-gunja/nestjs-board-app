import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDTO } from './DTO/create-board.dto';

@Injectable()
export class BoardsService {
  private board: Board[] = [];

  createBoard(createBoardDTO: CreateBoardDTO) {
    const { title, description } = createBoardDTO;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.board.push(board);
    return board;
  }

  getAllBoards(): Board[] {
    return this.board;
  }

  getBoardById(id: string): Board {
    const found = this.board.find((board) => board.id === id);

    if (!found) throw new NotFoundException(`can't find Board with id ${id}`);
    return found;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.board = this.board.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
