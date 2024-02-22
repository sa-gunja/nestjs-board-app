import { DataSource, Not, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDTO } from './DTO/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(
    createBoardDTO: CreateBoardDTO,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDTO;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
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

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.delete({ id, user });
    if (result.affected === 0)
      throw new NotFoundException(`Can't find with id ${id}`);
  }

  async updateBoardStatus(
    id: number,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    const board = await this.getBoardById(id);
    const result = await this.update({ id: board.id, user: user }, { status });
    if (result.affected === 0)
      throw new NotFoundException(`It's not your board ${id}`);
    board.status = status;
    // await this.save(board);

    return board;
  }

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    query.orderBy('id', 'DESC');
    const boards = await query.getMany();
    return boards;
    // return await this.find({
    //   where: { user: user },
    //   order: { id: 'desc' },
    // });
  }
}
