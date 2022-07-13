export const PASSWORD_LENGTH = 8;
export const FIRST_VERSION = 1;
export const UUID_VERSION = 4;
export const HASH_LEVEL = 3;

export const EXCEPTION = {
  BAD_REQUEST: {
    BAD_UUID: 'ID is invalid (not uuid)',
    NOT_FOUND: 'with this ID does not exist',
  },
  FORBIDDEN: {
    BAD_PASSWORD: 'old password is wrong',
  },
  UNPROCESSABLE_ENTITY: {
    NOT_FOUND: 'can not record because it does not exist',
  },
};
