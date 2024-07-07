// app/root.tsx

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLoaderData,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
// import { createTheme } from '@vanilla-extract/css';
import { useState, useEffect } from 'react';

import { fetchTheme } from '~/theme/dynamicTheme';
// const isValidTheme = (domain: string): domain is keyof typeof themes => {
//   return domain in themes;
// };

export async function loader({ request }: LoaderFunctionArgs) {
  // replace this with a GraphQL query
  const theme = await fetchTheme('localhost');
 return { theme };
}


export function Layout({ children }: { children: React.ReactNode }) {
const { theme } = useLoaderData<{ theme: string}>();

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          header content
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : []),
];

export default function App() {
  return <Outlet />;
}
