export type Theme = {
    colors: {
      primary: string;
      secondary: string;
    };
  };

  export type MetaData = {
    vid: string;
    siteName: string;
    title: string;
  };
  
  export type LoaderData = {
    theme: Theme;
    metadata: MetaData;
  };