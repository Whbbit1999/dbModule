import { Prop } from '@typegoose/typegoose';
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;
}
