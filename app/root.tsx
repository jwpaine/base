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
import type { LoaderData, Theme } from '~/types'; // Importing Theme type
import { json } from "@remix-run/node";
import client from '~/graphql/client'; // Import the updated client
import { GET_THEME } from '~/graphql/queries';

import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { Global, css } from "@emotion/react";
import { ApolloProvider } from '@apollo/client/react/context/index.js';

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

// Loader function to fetch data using Apollo Client
export const loader: LoaderFunction = async ({ request }) => {
  // Grab domain from the request
  const url = new URL(request.url);
  const hostname = url.hostname === 'localhost' ? 'base' : url.hostname;
  console.log('hostname:', hostname);
  const { data } = await client.query({
    query: GET_THEME,
    variables: { domain: hostname },
  });

  const theme: Theme = data.theme;

  // Ensure the theme object is valid and properly structured
  return json<LoaderData>({ theme });
};

export default function App() {
  const { theme } = useLoaderData<LoaderData>();

  // Ensure the theme object is valid before passing to ThemeProvider
  if (!theme || typeof theme !== 'object') {
    throw new Error('Invalid theme object');
  }

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
