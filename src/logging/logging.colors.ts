export type ColorType = string;

export type ColorsType = {
  black: ColorType;
  red: ColorType;
  green: ColorType;
  yellow: ColorType;
  blue: ColorType;
  magenta: ColorType;
  cyan: ColorType;
  white: ColorType;
  gray: ColorType;
};

export type ColorNameType = keyof ColorsType;

export const colors: ColorsType = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};
export const bgColors: ColorsType = {
  black: '\x1b[40m',
  red: '\x1b[41m',
  green: '\x1b[42m',
  yellow: '\x1b[43m',
  blue: '\x1b[44m',
  magenta: '\x1b[45m',
  cyan: '\x1b[46m',
  white: '\x1b[47m',
  gray: '\x1b[100m',
};

export const colorReset: ColorType = '\x1b[0m';
