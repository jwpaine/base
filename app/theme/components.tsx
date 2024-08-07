import styled from '@emotion/styled';
import type { Theme } from '~/types';

type ButtonProps = {
  theme?: Theme;
  buttonType: 'primary' | 'secondary';
  text: string;
  link?: string | null; // Make link optional to handle null
};

type TextProps = {
  theme?: Theme;
  text: string;
  color?: string; // Add color property as optional
  fontSize?: string;
};

// type ElementProps = {
//   theme?: Theme;
//   type?: 'H1' | 'Div';
//   background?: string;
//   minHeight?: string;
//   minWidth?: string;
//   maxWidth?: string;
//   margin?: string;
//   padding?: string;
//   color?: string;
//   fontSize?: string;
//   text?: string;
// };

export const Body = styled.body`
  padding: 0px;
  margin: 0px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row
`;




export interface ElementProps {
  children?: React.ReactNode; // Allow React elements as children
  [key: string]: string | undefined | React.ReactNode; // Extend index signature to accommodate React nodes
}


const attributes = (props: ElementProps): string => {
  let styles = '';

  // Iterate over each property in the props
  Object.entries(props).forEach(([key, value]) => {
    if (value) {
      // Append the CSS style for each kebab-case key
      styles += `${key}: ${value};\n`;
    }
  });

  return styles;
};

export const Container = styled.div<ElementProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => attributes(props)}
`;

export const H1 = styled.h1<ElementProps>`
  ${(props) => !props['font-size'] && 'font-size: 42px;'}
  ${(props) => !props.margin && 'margin: 0;'}
  ${(props) => !props.padding && 'padding: 0;'}
  ${(props) => attributes(props)} 
`;

export const Main = styled.main<ElementProps>`
  display: flex;
  flex-direction: column;
`;
