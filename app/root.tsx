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
import type { LoaderData, Theme, MetaData } from '~/types'; // Importing Theme type
import { json } from "@remix-run/node";
import client from '~/graphql/client'; // Import the updated client
import { GET_THEME_META } from '~/graphql/queries';

import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { Global, css } from "@emotion/react";
import { ApolloProvider } from '@apollo/client/react/context/index.js';
import { useEffect } from 'react';

// export const meta: MetaFunction = ({ data }) => {
//   return [{ title: data?.metadata?.title || "New Remix App" }];
// };

// Loader function to fetch data using Apollo Client
export const loader: LoaderFunction = async ({ request }) => {
  // Grab domain from the request
  const url = new URL(request.url);
  const hostname = url.hostname === 'localhost' ? 'base' : url.hostname;
  console.log('hostname:', hostname);
  const { data } = await client.query({
    query: GET_THEME_META,
    variables: { domain: hostname },
  });

  const theme: Theme = data.theme;
  const metadata: MetaData = data.metadata;

  // Ensure the theme object is valid and properly structured
  return json<LoaderData>({ theme, metadata });
};

export default function App() {
  const { theme, metadata} = useLoaderData<LoaderData>();

  // Ensure the theme object is valid before passing to ThemeProvider
  if (!theme || typeof theme !== 'object') {
    throw new Error('Invalid theme object');
  }

  useEffect(() => {
    document.title = metadata.title;
  }, [metadata.title]);

  return (
    <CacheProvider value={createCache({ key: 'custom' })}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <html lang="en">
            <head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              
              {/* <Meta /> */}
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
