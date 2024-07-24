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

type ContainerProps = {
  theme?: Theme;
  background?: string;
  minHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  margin?: string;
  padding?: string;
};

export const Body = styled.body`
  padding: 0px;
  margin: 0px;
`;

export const Header = styled.header`
  height: 60px;
  border-bottom: 1px solid #ccc;
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.background || 'none'};
  background-size: cover;
  min-height: ${(props) => props.minHeight || 'none'};
  padding: ${(props) => props.padding || '0'};
  margin: ${(props) => props.margin || '0'};
  min-width: ${(props) => props.minWidth || '0'};
  max-width: ${(props) => props.maxWidth || 'none'};
`;

export const Main = styled(Container)<ContainerProps>`
  flex-direction: column;
`;

export const H1 = styled.h1<TextProps>`
  color: ${(props) => props.color ? props.color : props.theme?.colors.primary};
  margin: 0;
  padding: 0;
  font-Size: ${(props) => props.fontSize || '42px'};
`;

export const P = styled.p<TextProps>`
  color: ${(props) => props.color ? props.color : props.theme?.colors.primary};
  margin: 0;
  padding: 0;
  font-Size: ${(props) => props.fontSize || '18px'};
`;

export const Button = styled.button<ButtonProps>`
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  background-color: ${(props) =>
    props.buttonType === 'primary'
      ? props.theme?.colors.primary
      : props.theme?.colors.secondary};
  color: #fff;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;