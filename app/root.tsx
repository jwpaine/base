// root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import type { Theme, MetaData, SiteData } from '~/types';
import { json } from "@remix-run/node";

import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { Global, css } from "@emotion/react";

import { Body, Header } from '~/theme/components';

import renderPageContent from "./renderPageContent";

import siteData from '~/site'; // Import the entire siteData

// Import the SiteDataProvider and types
import { SiteDataProvider } from '~/context/SiteDataContext';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const hostname = url.hostname === 'localhost' ? 'dreamfriday.com' : url.hostname;
  console.log('hostname:', hostname);

  // Return the entire siteData
  return json(siteData);
};

export default function App() {
  // Use useLoaderData to get the entire siteData
  const siteData = useLoaderData<SiteData>();

  // Extract theme and header from siteData
  const { theme, header } = siteData;

  // Ensure the theme object is valid before passing to ThemeProvider
  if (!theme || typeof theme !== 'object') {
    throw new Error('Invalid theme object');
  }

  return (
    <CacheProvider value={createCache({ key: 'custom' })}>
      <ThemeProvider theme={theme}>
        <SiteDataProvider siteData={siteData}>
          <html lang="en">
            <head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              <Links />
              {typeof document === "undefined" ? "__STYLES__" : null}
            </head>
            <Body>
              <Header>
                {renderPageContent(header)}
              </Header>
              <Global
                styles={css`
                  html {
                    scroll-behavior: smooth;
                  }
                  body {
                    padding: 0;
                    margin: 0;
                  },
                  
                `}
              />
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              {process.env.NODE_ENV === "development" && <LiveReload />}
            </Body>
          </html>
        </SiteDataProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
