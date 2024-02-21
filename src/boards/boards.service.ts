import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDTO } from './DTO/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDTO);
  }

  getBoardById(id: number): Promise<Board> {
    const found = this.boardRepository.getBoardById(id);

    if (!found) throw new NotFoundException(`can't find Board with id ${id}`);

    return found;
  }

  deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }
}
