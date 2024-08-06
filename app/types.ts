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
  __typename: 'Container';
  type?: string;
  text?: string;
  styling?: object;
  
  elements: PageElement[];
};

export type PageContent = Array<PageElement>;

export type LoaderData = {
  theme?: Theme;
  metadata: MetaData;
  pageContent: PageContent;
};
