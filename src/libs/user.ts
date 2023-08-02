import { User } from 'src/api/user/entities/user.entity';
import { getTimestamp } from './date';

export const getUserToResponse = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
  return {
    ...userWithoutPassword,
    createdAt: getTimestamp(new Date(createdAt)),
    updatedAt: getTimestamp(new Date(updatedAt)),
  };
};
