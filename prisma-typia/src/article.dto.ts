import { tags } from 'typia';

export interface ArticleDto {
  title: string & tags.MaxLength<3>;
  body: string;
}

export interface IBbsArticle extends IBbsArticle.IStore {
  id: string & tags.Format<'uuid'>;
  created_at: string & tags.Format<'date-time'>;
}
export namespace IBbsArticle {
  export interface IStore {
    title: string & tags.MinLength<3> & tags.MaxLength<50>;
    body: string;
    //files: IAttachmentFile[];
  }
}

// export interface IAttachmentFile {
//   name: null | (string & tags.MinLength<1> & tags.MaxLength<255>);
//   extension: null | (string & tags.MinLength<1> & tags.MaxLength<8>);
//   url: string & tags.Format<'url'>;
// }
