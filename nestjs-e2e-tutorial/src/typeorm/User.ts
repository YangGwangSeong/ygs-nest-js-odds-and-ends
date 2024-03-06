import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const columnDefaultOptions = {
  nullable: false,
  default: '',
};
@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column()
  username: string;

  @Column({
    name: 'email_address',
    nullable: true,
    ...columnDefaultOptions,
  })
  emailAddress: string;

  @Column({
    ...columnDefaultOptions,
  })
  password: string;
}
