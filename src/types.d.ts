export interface PageType {
  title: string;
  content: string;
  id: string;
}

export type ApiPageType = Omit<PageType, 'id'>

export interface PagesType {
  [id: string]: PageType;
}