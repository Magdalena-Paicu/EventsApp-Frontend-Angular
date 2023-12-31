import { Card } from './card';

export interface User {
  email: string;
  username: string;
  password: string;
  is_admin: boolean;
  is_confirmed: boolean;
  token: string;
  favoriteEvents: Card[];
}
