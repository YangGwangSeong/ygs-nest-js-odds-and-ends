import typia, { tags } from 'typia';

export interface ArticleDto {
  title: string & tags.MaxLength<3>;
  body: string;
}
