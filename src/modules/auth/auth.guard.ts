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
    const bearer: string = context.switchToHttp().getRequest()
      .headers.authorization;
    let guardFlag = false;

    if (bearer === '') {
      guardFlag = false;
      throw new UnauthorizedException(EXCEPTION.AUTHORIZATION.NOT_TOKEN);
    }

    const preparedToken: string = bearer.replace('Bearer ', '');

    jwt.verify(
      preparedToken,
      process.env.JWT_SECRET_KEY,
      null,
      (err: jwt.VerifyErrors, decoded: Jwt | undefined) => {
        if (decoded) {
          guardFlag = true;
        }

        if (err) {
          guardFlag = false;
          throw new UnauthorizedException(EXCEPTION.AUTHORIZATION.INVALID);
        }
      },
    );

    return guardFlag;
  }
}
