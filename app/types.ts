// types.ts
export type Theme = {
  colors: {
    primary: string;
    secondary?: string | null; // Make secondary optional to handle null more gracefully
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
  link?: string | null; // Make link optional to handle null
  buttonType: 'primary' | 'secondary';
};

export type TextElement = {
  __typename: 'H1' | 'P';
  text: string;
  color?: string; // Add color property as optional
  fontSize?: string;
};

export type ContainerElement = {
  __typename: 'Container';
  background?: string; // Make background optional
  minHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  margin?: string;
  padding?: string;
  elements: PageElement[];
};

export type PageElement = ButtonElement | TextElement | ContainerElement;

export type PageContent = Array<ContainerElement>;

export type LoaderData = {
  theme?: Theme;
  metadata: MetaData;
  pageContent: PageContent;
};
