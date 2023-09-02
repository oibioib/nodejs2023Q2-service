import { join } from 'path';
import { existsSync, statSync } from 'fs';

import { LOG_METHODS } from './logging.constants';

export const isDirExist = (path: string) => existsSync(path);

export const isFileSizeGraterThenMax = (maxFileSize: number, path: string) => {
  const fileStat = statSync(path);
  return fileStat.size >= maxFileSize;
};

export const getLogFileName = (
  files: string[],
  logMethod: keyof typeof LOG_METHODS,
  maxSize: number,
  folderPath: string,
) => {
  const logMethodLowerCase = logMethod.toLowerCase();
  const logLevel =
    logMethodLowerCase === LOG_METHODS.ERROR.toLowerCase()
      ? LOG_METHODS.ERROR.toLowerCase()
      : LOG_METHODS.LOG.toLowerCase();

  const logFiles = files.filter((file) => file.endsWith(`-${logLevel}.txt`));

  const timeStamp = Date.now();
  let newFileName = `${timeStamp}-${logLevel}.txt`;

  if (logFiles.length) {
    const lastLogTimeStamp = logFiles
      .map((fileName) => {
        const [timeStamp] = fileName.split('-');
        return timeStamp;
      })
      .reduce((acc, curr) => (curr > acc ? curr : acc), '');

    const lastLogName = `${lastLogTimeStamp}-${logLevel}.txt`;
    const lastLogPath = join(folderPath, lastLogName);

    const isLastLogFileBig = isFileSizeGraterThenMax(maxSize, lastLogPath);

    if (!isLastLogFileBig) newFileName = lastLogName;
  }

  return newFileName;
};
