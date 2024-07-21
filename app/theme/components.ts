import styled from '@emotion/styled';
import type { Theme } from '~/types';

type ButtonProps = {
  theme?: Theme;
  buttonType: 'primary' | 'secondary';
  text: string;
  link: string;
};

type H1Props = {
  theme?: Theme;
  text: string;
  color: string;
};

type ContainerProps = {
  theme?: Theme;
  background: string;
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
  background: ${(props) => props.background || 'none'};
`;

export const H1 = styled.h1<H1Props>`
  font-size: 27px;
  color: ${(props) => props.color ? props.color : props.theme?.colors.primary};
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



