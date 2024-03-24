import { User } from 'src/schemas/User.schema';

export type UserResponseType = Omit<User, 'password'> & {token: string};
