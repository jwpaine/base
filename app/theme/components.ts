import styled from '@emotion/styled';
import type { Theme } from '~/types';

export const H1 = styled.h1<{ theme?: Theme }>` 
  font-size: 27px;
  color: ${(props) => props.theme?.colors.primary}; 
`;