import typia, { tags } from 'typia';

export interface ArticleDto {
  title: string & tags.MaxLength<3>;
  body: string;
}

const result = typia.assert<IMember>({
  email: 'samchon.github@gmail.com',
  age: 30,
  sex: 1, // extra
});

interface IMember {
  email: string & tags.Format<'email'>;
  age: number &
    tags.Type<'uint32'> &
    tags.ExclusiveMinimum<19> &
    tags.Maximum<100>;
}
