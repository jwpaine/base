import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";

import { getSiteData } from '~/models/site.server';
import { SiteDataProvider } from '~/context/SiteDataContext';
import type { SiteData } from '~/types';

// Emotion-related imports
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';


// Create Emotion cache (used in both client and server)
export const emotionCache = createCache({ key: 'css' });

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const domain = url.hostname === 'localhost' ? 'dreamfriday.com' : url.hostname;

  const siteData = await getSiteData(domain);

  return json(siteData);
};

export default function Root() {
  const siteData = useLoaderData<SiteData>();

  return (
    <CacheProvider value={emotionCache}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          {/* Placeholder for Emotion styles that will be replaced during SSR */}
          {typeof document === "undefined" ? "__STYLES__" : null}
        </head>
        <body>
          <SiteDataProvider siteData={siteData}>
            <Outlet />
          </SiteDataProvider>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </CacheProvider>
  );
}
