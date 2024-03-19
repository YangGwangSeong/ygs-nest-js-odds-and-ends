import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PostsModel {
  @PrimaryColumn({ type: 'int4' })
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
