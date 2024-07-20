// routes/_index.tsx
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { H1, Button } from "~/theme/components";
import type { MetaData, LoaderData, PageContent, PageElement, ButtonElement, H1Element } from "~/types";
import client from '~/graphql/client';
import { GET_HOME_CONTENT } from '~/graphql/queries';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const hostname = url.hostname;
  console.log('hostname:', hostname);

  const { data } = await client.query({
    query: GET_HOME_CONTENT,
    variables: {
      domain: hostname,
    },
  });

  if (!data || !data.Sites || !data.Sites.docs || data.Sites.docs.length === 0) {
    throw new Error('No page content data found for the given domain');
  }

  console.log('data:', JSON.stringify(data, null, 2));

  const pageContent = data.Sites.docs[0].pages.home[0]; // Adjust to access the first element of the home array
  const metadata = data.Sites.docs[0].meta;

  return json({ pageContent, metadata });
};

const componentMap: Record<string, React.ComponentType<any>> = {
  Button: Button,
  H1: H1,
};

const renderPageContent = (pageContent: { __typename: string; elements: PageElement[] }) => {
  if (!pageContent || !pageContent.elements) {
    console.error('Invalid page content:', pageContent);
    return <main>No content available</main>;
  }

  const elements: PageElement[] = pageContent.elements;
  return (
    <main>
      {elements.map((element, index) => {
        const Component = componentMap[element.__typename];
        if (!Component) {
          console.error('Unknown component type:', element.__typename);
          return null;
        }
        // Explicitly handle the button text
        if (element.__typename === 'Button') {
          const buttonElement = element as ButtonElement;
          return <Component key={index} {...buttonElement}>{buttonElement.text}</Component>;
        }
        return <Component key={index} {...element} />;
      })}
    </main>
  );
};

export default function Index() {
  const { metadata } = useRouteLoaderData<LoaderData>("root") || { metadata: { title: "Default Title" } };
  const { pageContent } = useLoaderData<{ pageContent: { __typename: string; elements: PageElement[] } }>();

  if (!pageContent) {
    console.error('Invalid loader data:', pageContent);
    return <main>Loading...</main>;
  }

  return renderPageContent(pageContent);

  /* return (
    <main>
      <H1>
        {metadata.title}
      </H1>
    </main>
  );
  */
}
