export interface NoteModel {
  title?: string;
  description: string;
  color: string;
}

export interface ItemModel {
  title: string;
  content: string;
  link?: boolean;
  published: boolean;
}

