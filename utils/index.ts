import * as bcrypt from 'bcrypt';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { EXCEPTION, FIRST_ITEM, HASH_LEVEL, UUID_VERSION } from '../constants';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../src/modules/users/users.interface';
import { Jwt } from 'jsonwebtoken';

export const uuidValidateV4 = (uuid: string): boolean => {
  return uuidValidate(uuid) && uuidVersion(uuid) === UUID_VERSION;
};

export const getHashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, HASH_LEVEL);
};

export const comparePassword = async (
  password,
  oldPassword,
): Promise<boolean> => {
  return await bcrypt.compare(password, oldPassword);
};

export const prepareResult = (favorites) => {
  return {
    artists:
      favorites.length && favorites[FIRST_ITEM].artists
        ? favorites[FIRST_ITEM].artists
        : [],
    albums:
      favorites.length && favorites[FIRST_ITEM].albums
        ? favorites[FIRST_ITEM].albums
        : [],
    tracks:
      favorites.length && favorites[FIRST_ITEM].tracks
        ? favorites[FIRST_ITEM].tracks
        : [],
  };
};

export const checkBearerToken = (authorization: string): IUser | void => {
  let bearer = '';
  let user;

  if (typeof authorization != 'undefined') {
    bearer = authorization.replace('Bearer ', '');
  }
  if (bearer === '') {
    throw new UnauthorizedException(EXCEPTION.AUTHORIZATION.NOT_TOKEN);
  }

  jwt.verify(
    bearer,
    process.env.JWT_SECRET_KEY,
    null,
    (err: jwt.VerifyErrors, decoded: Jwt | undefined) => {
      if (decoded) {
        user = decoded;
      }

      if (err) {
        throw new UnauthorizedException(EXCEPTION.AUTHORIZATION.INVALID);
      }
    },
  );

  return user;
};
