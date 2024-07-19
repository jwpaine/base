import styled from '@emotion/styled';
import type { Theme } from '~/types';


export const Body = styled.body`
    padding: 0px;
    margin: 0px;
`
export const Header = styled.header`
    height: 60px;
    border-bottom: 1px solid #ccc;
`
export const H1 = styled.h1<{ theme?: Theme }>` 
  font-size: 27px;
  color: ${(props) => props.theme?.colors.primary}; 
`;

