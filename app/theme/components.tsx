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

type ElementProps = {
  theme?: Theme;
  type?: 'H1' | 'Div';
  background?: string;
  minHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  margin?: string;
  padding?: string;
  color?: string;
  fontSize?: string;
  text?: string;
};

export const Body = styled.body`
  padding: 0px;
  margin: 0px;
`;

export const Header = styled.header`
  height: 60px;
  border-bottom: 1px solid #ccc;
`;


export const Main = styled.main<ElementProps>`
  flex-direction: column;
`;

const attributes = (props: ElementProps) => `
  ${props.background ? `background: ${props.background};` : ''}
  ${props.minHeight ? `min-height: ${props.minHeight};` : ''}
  ${props.minWidth ? `min-width: ${props.minWidth};` : ''}
  ${props.maxWidth ? `max-width: ${props.maxWidth};` : ''}
  ${props.margin ? `margin: ${props.margin};` : ''}
  ${props.padding ? `padding: ${props.padding};` : ''}
  ${props.color ? `color: ${props.color};` : props.theme ? `color: ${props.theme.colors.primary};` : ''}
  ${props.fontSize ? `font-size: ${props.fontSize};` : ''}
`;

export const Container = styled.div<ElementProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => attributes(props)}
`;

export const H1 = styled.h1<ElementProps>`
  ${props => !props.fontSize && 'font-size: 42px;'}
  ${props => !props.margin && 'margin: 0;'}
  ${props => !props.padding && 'padding: 0;'}

  ${props => attributes(props)} 
  
  `

