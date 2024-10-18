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



export interface ElementProps {
  fontSize?: string;
  margin?: string;
  padding?: string;
  styling?: any;
  [key: string]: any; // Add an index signature to accommodate any additional string properties
}


const attributes = (props: ElementProps): string => {
  let styles = '';
  let attributes = props.styling || {};
  Object.entries(attributes).forEach(([key, value]) => {
    if (value) {
      // Append the CSS style for each kebab-case key
      styles += `${key}: ${value};\n`;
    }
  });
  return styles;
};

export const Header = styled.header`
  ${(props) => attributes(props)}
`;

export const Container = styled.div<ElementProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => attributes(props)}
`;



export const H1 = styled.h1<ElementProps>`
  ${(props) => !props['font-size'] && 'font-size: 42px;'}
  ${(props) => !props.styling?.margin && 'margin: 0;'}
  ${(props) => !props.styling?.padding && 'padding: 0;'}
  ${(props) => attributes(props)} 
`;

export const P = styled.p<ElementProps>`
  ${(props) => !props.styling['font-size'] && 'font-size: 16px;'}
  ${(props) => !props.styling?.margin && 'margin: 0;'}
  ${(props) => !props.styling?.padding && 'padding: 0;'}
  ${(props) => attributes(props)} 
`;

export const Button = styled.button<ElementProps>`
  ${(props) => attributes(props)} 
`;

export const A = styled.a`
  text-decoration: none;
`;
export const Main = styled.main<ElementProps>`
   display: flex;
  justify-content: center;
  flex-direction: column;
  ${(props) => attributes(props)}
`;

export const Editor = styled.textarea<ElementProps>`
  height: 500px;
  width: 100%;
`

export const Cloud = styled.div<ElementProps>`

  width: ${(props) => props.styling.width || '232'}px;
  height: ${(props) => props.styling.width * 0.396 || '92'}px;
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
  width: ${(props) => props.styling.width * 0.366 || '85'}px;
  height: ${(props) => props.styling.width * 0.366 || '85'}px;
  top: ${(props) => props.styling.width * -0.168 || '-39'}px;
  left: ${(props) => props.styling.width * 0.172 || '40'}px;
  }
  &:before {
  content: "";
  position: relative;
  display: inline-block;
  background: inherit;
  border-radius: inherit;
  width: ${(props) => props.styling.width * 0.453 || '105'}px;
  height: ${(props) => props.styling.width * 0.453 || '105'}px;
  top:  ${(props) => props.styling.width * -0.25 || '-58'}px;
  left: ${(props) => props.styling.width * 0.405 || '94'}px;
  position: absolute;
  }

  ${(props) => attributes(props)} 

`
