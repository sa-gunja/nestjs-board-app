import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as config from '../../node_modules/config';
@Injectable()
// Nest.js can inject it anywhere this service is needed
// via its Dependency Injection system
export class JwtStrategy extends PassportStrategy(Strategy) {
  // The Class extends the Passport Strategy class defined by @nestjs/passport package
  // you're passing the JWT strategy defined by the passport-jwt Node.js package
  constructor(private userRepository: UserRepository) {
    // passes two important options
    super({
      secretOrKey: config.get('jwt.secret'),
      // This configures the secret key that JWT Strategy will use
      // to decrypt the JWT token in order to validate it and access it's payload
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // this Configures the Strategy (imported from passport-jwt package)
      // to look for the JWT in the Authorization Header of the current Request
      // passport over as a Bearer Token
    });
  }

  /**
   * 위에서 토큰이 유효한지 체크 되면 validate 메소드에서 payload 안에 username이
   * DB 에 존재하는지 확인 후 있다면 유저 객체를 return
   * return 된 유저 객체는 @UserGuards(AuthGuard())를 이용한 모든 요청의 Request Object 에 들어간다.
   */

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
