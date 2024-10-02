// types.ts
export type Theme = {
  colors: {
    primary: string;
    secondary?: string | null;
  };
};

export type MetaData = {
  vid: string;
  siteName: string;
  title: string;
};

export type PageElement = {
  type?: string;
  text?: string;
  link?: string;
  styling?: object;
  id?: string;
  
  elements: PageElement[];
};

export type PageContent = Array<PageElement>;

export type LoaderData = {
  theme?: Theme;
  metadata: MetaData;
  pageContent: PageContent;
};

export interface SiteData {
  meta: MetaData;
  theme: Theme;
  pages: {
    home: PageElement[];
  };
  header: PageElement[];
}
