import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDTO } from './DTO/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  createBoard(createBoardDTO: CreateBoardDTO, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDTO, user);
  }

  getBoardById(id: number): Promise<Board> {
    const found = this.boardRepository.getBoardById(id);

    if (!found) throw new NotFoundException(`can't find Board with id ${id}`);

    return found;
  }

  deleteBoard(id: number, user: User): Promise<void> {
    return this.boardRepository.deleteBoard(id, user);
  }

  updateBoardStatus(
    id: number,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status, user);
  }

  getAllBoards(user: User): Promise<Board[]> {
    return this.boardRepository.getAllBoards(user);
  }
}
