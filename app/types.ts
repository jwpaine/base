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

export type Style = {
  background?: string;
  minHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  margin?: string;
  padding?: string;
  color?: string;
  textSize?: string;
};

export type ButtonElement = {
  __typename: 'Button';
  type: 'Button';
  text: string;
  link?: string | null;
  buttonType: 'primary' | 'secondary';
  style?: Style;
};

export type TextElement = {
  __typename: 'H1' | 'P';
  type: 'H1' | 'P';
  text: string;
  style?: Style;
};

export type ContainerElement = {
  __typename: 'Container';
  type: 'Container';
  text?: string;
  style?: Style;
  elements: PageElement[];
};

export type PageElement = ButtonElement | TextElement | ContainerElement;

export type PageContent = Array<ContainerElement>;

export type LoaderData = {
  theme?: Theme;
  metadata: MetaData;
  pageContent: PageContent;
};
