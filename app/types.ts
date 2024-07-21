// types.ts
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
  link: string | null;
  buttonType: 'primary' | 'secondary';
};

export type H1Element = {
  __typename: 'H1';
  text: string;
  color?: string; // Add color property
};

export type ContainerElement = {
  __typename: 'Container';
  background: string;
  elements: PageElement[];
};

export type PageElement = ButtonElement | H1Element | ContainerElement;

export type PageContent = Array<ContainerElement>;

export type LoaderData = {
  theme: Theme;
  metadata: MetaData;
  pageContent: PageContent;
};
