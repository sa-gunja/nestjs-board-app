import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDTO } from './DTO/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    const { title, description } = createBoardDTO;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.findOne({
      where: {
        id: id,
      },
    });

    if (!board) throw new NotFoundException(`Can't find with id ${id}`);

    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Can't find with id ${id}`);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.save(board);
    return board;
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.find({ order: { id: 'desc' } });
  }
}
