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
  flex-direction: row;
  height: 60px;
`;




export interface ElementProps {
  fontSize?: string;
  margin?: string;
  padding?: string;
  styling?: string;
  [key: string]: any; // Add an index signature to accommodate any additional string properties
}


const attributes = (props: ElementProps): string => {
  let styles = '';
  console.log("I am props", props);
  let attributes = props.styling || {};
  Object.entries(attributes).forEach(([key, value]) => {
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

export const Cloud = styled.div<ElementProps>`

  width: 232px;
  height: 92px;
  background: #ECEFF1;
  box-shadow: 10px 10px rgba(0,0,0,0.2);
  border-radius: 100px;
  position: relative;

  &:after{
   content: "";
  position: absolute;
  display: inline-block;
  background: inherit;
  border-radius: inherit;
  width: 85px;
  height: 92px;
  top: -39px;
  left: 40px;
  }
  &:before {
  content: "";
  position: relative;
  display: inline-block;
  background: inherit;
  border-radius: inherit;
  width: 103px;
  height: 106px;
  top: -51px;
  left: 94px;
  position: absolute;
  }

`
