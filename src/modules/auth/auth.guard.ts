import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EXCEPTION } from '../../../constants';
import * as jwt from 'jsonwebtoken';
import { Jwt } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const bearer = context.switchToHttp().getRequest().headers.authorization;

    if (bearer === '') {
      throw new UnauthorizedException(EXCEPTION.AUTHORIZATION.NOT_TOKEN);
    }

    jwt.verify(
      bearer,
      process.env.JWT_SECRET_KEY,
      null,
      (err: jwt.VerifyErrors, decoded: Jwt | undefined) => {
        if (decoded) {
          return true;
        }

        if (err) {
          throw new UnauthorizedException(EXCEPTION.AUTHORIZATION.INVALID);
        }
      },
    );

    return false;
  }
}
