import * as bcrypt from 'bcrypt';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { EXCEPTION, FIRST_ITEM, HASH_LEVEL, UUID_VERSION } from '../constants';
import { HttpException } from '@nestjs/common';
import * as fs from 'fs';
import { ErrorResponse } from '../type';
import e from 'express';

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

export const prepareStringForLog = (
  errorResponse: ErrorResponse,
  request: e.Request,
  exception: unknown,
): string => {
  const { method, url }: { method: string; url: string } = request;

  return `Response Code: ${
    errorResponse.statusCode
  } - Method: ${method} - URL: ${url} - TimeStamp: ${errorResponse.timeStamp}\n
    ${
      exception instanceof HttpException ? exception.stack : errorResponse.error
    }\n`;
};

export const writeLog = (errorLog: string): void => {
  const logsFolder: string = process.env.LOGS_FOLDER;
  const logFileSize = Number(process.env.LOG_FILE_SIZE);

  fs.readdir(logsFolder, (err: NodeJS.ErrnoException, files: string[]) => {
    if (err) {
      const fullPath: string = createNewLogsPath(logsFolder);
      createFolder(logsFolder);
      writeLogInFile(fullPath, errorLog);
    }
    (files || []).forEach((file: string) => {
      const fileSize: number = checkLogFileSize(`${logsFolder}/${file}`);

      if (fileSize < logFileSize) {
        writeLogInFile(`${logsFolder}/${file}`, errorLog);
      } else {
        const fullPath: string = createNewLogsPath(logsFolder);
        writeLogInFile(fullPath, errorLog);
      }
    });
  });
};

export const createNewLogsPath = (logsFolder: string): string => {
  const logFileName: number = new Date().valueOf();
  return `${logsFolder}/${logFileName}.log`;
};

export const writeLogInFile = (logName: string, errorLog: string) => {
  fs.appendFile(logName, errorLog, 'utf8', (err: NodeJS.ErrnoException) => {
    if (err) throw err;
  });
};

export const createFolder = (logsFolder: string): void => {
  fs.mkdir(logsFolder, { recursive: true }, (err: NodeJS.ErrnoException) => {
    if (err) throw err;
  });
};

export const checkLogFileSize = (fileName: string): number => {
  try {
    const stats: fs.Stats = fs.statSync(fileName);
    return stats.size;
  } catch (e) {
    console.log(EXCEPTION.LOG_FILE.ERROR);
  }
};
