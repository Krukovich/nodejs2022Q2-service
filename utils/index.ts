import * as bcrypt from 'bcrypt';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { FIRST_ITEM, HASH_LEVEL, UUID_VERSION } from '../constants';

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
