import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

// custom decorator
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    // Request Info 를 받아올 수 있다.
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
