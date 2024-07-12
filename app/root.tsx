import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import type { LoaderData } from '~/types';
import { json } from "@remix-run/node";
import client from '~/graphql/client';
import { GET_THEME } from '~/graphql/queries';

import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { Global, css } from "@emotion/react";
import apolloPkg from '@apollo/client';
const { ApolloProvider } = apolloPkg;

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

// Loader function to fetch data using Apollo Client
export const loader: LoaderFunction = async () => {
  const { data } = await client.query({
    query: GET_THEME,
    variables: { domain: "domain2" },
  });

  const theme = data.theme;

  return json<LoaderData>({ theme });
};

export default function App() {
  const { theme } = useLoaderData<LoaderData>();

  return (
    <CacheProvider value={createCache({ key: 'custom' })}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <html lang="en">
            <head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              <Meta />
              <Links />
              {typeof document === "undefined" ? "__STYLES__" : null}
            </head>
            <body>
              {/* <Global
                styles={css`
                  body {
                    background-color: ${theme.colors.secondary};
                  }
                `}
              /> */}
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              {process.env.NODE_ENV === "development" && <LiveReload />}
            </body>
          </html>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
