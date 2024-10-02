// routes/_index.tsx
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { LoaderData, PageContent} from "~/types";

import renderPageContent from '~/renderPageContent';

import siteData from '~/site';

// export const loader: LoaderFunction = async ({ request }) => {
//   const url = new URL(request.url);
//   const hostname = url.hostname == 'localhost' ? 'dreamfriday.com' : url.hostname;


//   const pageContent = siteData.pages.home;
  
//   // const { data } = await client.query({
//   //   query: GET_HOME_CONTENT,
//   //   variables: {
//   //     domain: hostname,
//   //   },
//   // });

//   // if (!data || !data.Sites || !data.Sites.docs || data.Sites.docs.length === 0) {
//   //   throw new Error('No page content data found for the given domain');
//   // }

//   // console.log('data:', JSON.stringify(data, null, 2));

//   // const pageContent = data.Sites.docs[0].pages.home; // Adjust to access the home array directly
//   // const metadata = data.Sites.docs[0].meta;

//   return json({ pageContent});
// };

import { useSiteData } from '~/context/SiteDataContext';

export default function Index() {
  // const { metadata } = useRouteLoaderData<LoaderData>("root") || { metadata: { title: "Default Title" } };
  // const { pageContent } = useLoaderData<{ pageContent: PageContent }>();

  // if (!pageContent) {
  //   console.error('Invalid loader data:', pageContent);
  //   return <main>Loading...</main>;
  // }

  const { pages } = useSiteData();

  return (
    <div>
      {renderPageContent(pages.home)}
    </div>
  );

}
