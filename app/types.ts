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

// types.ts
export interface SiteData {
  meta: MetaData;
  theme: Theme;
  pages: {
    [key: string]: PageElement[]; // Allow any page key, not just 'home'
  };
  header: PageElement[];
}


