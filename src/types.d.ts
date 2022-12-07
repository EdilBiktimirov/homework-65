export interface PageType {
  title: string;
  content: string;
  name: string;
}

export type ApiPageType = Omit<PageType, 'name'>

export interface PagesType {
  [id: string]: PageType;
}