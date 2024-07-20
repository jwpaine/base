export type Theme = {
  colors: {
    primary: string;
    secondary: string | null; // Allow null for secondary color
  };
};

export type MetaData = {
  vid: string;
  siteName: string;
  title: string;
};

export type ButtonElement = {
  __typename: 'Button';
  text: string;
  link: string;
  buttonType: 'primary' | 'secondary';
};

export type H1Element = {
  __typename: 'H1';
  text: string;
};

export type PageElement = ButtonElement | H1Element;

export type PageContent = {
  home: Array<{
    __typename: 'Content';
    elements: PageElement[];
  }>;
};

export type LoaderData = {
  theme: Theme;
  metadata: MetaData;
  pageContent: PageContent;
};
