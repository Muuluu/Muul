import { ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserAuthGuard {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    try {
      let req = context.switchToHttp().getRequest();
      const headers = context.switchToHttp().getRequest().headers;
      if (!headers.authorization) throw 'Header error';

      const [prefix, token] = headers.authorization.split(' ');
      if (prefix !== 'Bearer') throw 'Header error';

      const decode = verify(token, 'muuluu');
      if (!decode) throw 'Token undefiened';


      req.user = {
        id: decode.userId,
        logged: Date.now()
      };

      return true;
    } catch (e) {
      throw new HttpException('UNAUTHORIZED_ERROR', 401);
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
