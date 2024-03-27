import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum RolesEnum {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    unique: true,
  })
  nickname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  role: RolesEnum;
}
