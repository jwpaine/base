// routes/_index.tsx
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Container, H1, Button, P } from "~/theme/components";
import type { MetaData, LoaderData, PageContent, PageElement, ButtonElement, TextElement, ContainerElement } from "~/types";
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
  Button: Button,
  H1: H1,
  Container: Container,
  P: P,
};

const renderPageContent = (pageContent: PageContent) => {
  if (!pageContent) {
    console.error('Invalid page content:', pageContent);
    return <main>No content available</main>;
  }

  const renderElements = (elements: PageElement[]) => {
    return elements.map((element, index) => {
      const Component = componentMap[element.__typename];
      if (!Component) {
        console.error('Unknown component type:', element.__typename);
        return null;
      }

      
      console.log('element:', element.__typename);
      switch (element.__typename) {
        
        case 'Container': {
          const containerElement = element as ContainerElement;
          return (
            <Component key={index} {...containerElement}>
              {renderElements(containerElement.elements)}
            </Component>
          );
        }
        case 'Button': {
          const { text, ...rest } = element as ButtonElement;
          return <Component key={index} {...rest}>{text}</Component>;
        }
        case 'H1': {
          const { text, ...rest } = element as TextElement;
          return <Component key={index} {...rest}>{text}</Component>;
        }
        case 'P': {
          const { text, ...rest } = element as TextElement;
          return <Component key={index} {...rest}>{text}</Component>;
        }
        default: return "Unknown element type";
      }
    });
  };

  return (
    <main>
      {pageContent.map((container, index) => {
        const ContainerComponent = componentMap[container.__typename];
        return (
          <ContainerComponent key={index} {...container}>
            {renderElements(container.elements)}
          </ContainerComponent>
        );
      })}
    </main>
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
