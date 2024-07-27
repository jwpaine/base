// routes/_index.tsx
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { H1, Main } from "~/theme/components";
import type { MetaData, LoaderData, PageContent, PageElement, ButtonElement, TextElement } from "~/types";
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

  const pageContent = data.Sites.docs[0].pages.home; // Adjust to access the home array directly
  const metadata = data.Sites.docs[0].meta;

  return json({ pageContent, metadata });
};

const componentMap: Record<string, React.ComponentType<any>> = {
  H1: H1,
};

const renderPageContent = (pageContent: PageContent) => {
  console.log("rendering page content");
  if (!pageContent) {
    console.error('Invalid page content:', pageContent);
    return <main>No content available</main>;
  }

  const renderElements = (elements: PageElement[]) => {
    if (!elements || elements.length === 0) {
      console.error('No sub elements');
      return null;
    }

    return elements.map((element, index) => {
      if (!element || !element.type) {
        console.error('Invalid element:', element);
        return null;
      }

      const Component = componentMap[element.type];
      if (!Component) {
        console.error('Unknown component type:', element.type);
        return null;
      }

      const { style = {}, ...rest } = element;

      // Spread style properties directly into the component props
      return (
        <Component key={index} {...style}>
          {renderElements((rest as PageElement).elements)}
          {rest.text}
        </Component>
      );
    });
  };

  return (
    <Main>
      {pageContent.map((element, index) => {
        if (!element || !element.type) {
          console.error('Invalid container element:', element);
          return null;
        }

        const Component = componentMap[element.type];
        if (!Component) {
          console.error('Unknown container type:', element.type);
          return null;
        }

        const { style = {}, elements: childElements, ...rest } = element;

        return (
          <Component key={index} {...style}>
            {renderElements(childElements)}
            {rest.text}
          </Component>
        );
      })}
    </Main>
  );
};

export default function Index() {
  const { metadata } = useRouteLoaderData<LoaderData>("root") || { metadata: { title: "Default Title" } };
  const { pageContent } = useLoaderData<{ pageContent: PageContent }>();

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
