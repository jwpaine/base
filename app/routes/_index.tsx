import { useLoaderData, useMatches} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useEffect, useState } from 'react';
import { useRouteLoaderData } from "@remix-run/react";
import styled from '@emotion/styled';
import { useOutletContext } from "@remix-run/react";
import type { Theme } from '~/types';
// Define a type for the data you expect from the loader
type LoaderData = {
  domain: string;
};

const H1 = styled.h1<{ theme?: Theme }>` // Make theme optional
  font-size: 27px;
  color: ${(props) => props.theme?.colors.primary}; // Use optional chaining
`;

export default function Index() {
 // const { theme } = useOutletContext<{ theme: Theme }>();
 // const { domain } = useRouteLoaderData("root") as LoaderData;

  return (
    <main>
      <H1>asd</H1>
    </main>
  );
}
