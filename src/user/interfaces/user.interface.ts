import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  userPhoto: string;
  cardPhoto: string;
  name: string;
  gender: string;
  numberPhone: string;
  birthDate: string;
}
