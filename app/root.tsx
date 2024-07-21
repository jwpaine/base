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

import { Body, Header } from '~/theme/components';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const hostname = url.hostname;
  console.log('hostname:', hostname);
  
  const { data } = await client.query({
    query: GET_THEME_META,
    variables: {
      domain: hostname,
    },
  });


  if (!data || !data.Sites || !data.Sites.docs || data.Sites.docs.length === 0) {
    throw new Error('No data found for the given domain');
  }

  const siteData = data.Sites.docs[0];
  const theme: Theme = siteData.theme;
  const metadata: MetaData = siteData.meta;

  console.log('theme:', theme);
  console.log('metadata:', metadata)


  return json({ theme, metadata });
};

export default function App() {
  // const { theme, metadata} = useLoaderData<LoaderData>();
  const { theme, metadata } = useLoaderData<{ theme: Theme, metadata: MetaData }>();


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
            <Body>
              <Header />
              <Global
                styles={css`
                  body {
                    padding: 0;
                    margin: 0;
                  }
                  
                `}
              />
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              {process.env.NODE_ENV === "development" && <LiveReload />}
            </Body>
          </html>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
