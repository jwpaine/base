import {
  H1,
  Container,
  Main,
  Cloud,
  P,
  A,
  Button
} from "~/theme/components";

import type { MetaData, LoaderData, PageContent, PageElement } from "~/types";
import { useNavigate } from "@remix-run/react";
const componentMap: Record<string, React.ComponentType<any>> = {
  H1: H1,
  Container: Container,
  Cloud: Cloud,
  P: P,
  Button: Button,
  Div: Container
};

const renderPageContent = (pageContent: PageContent) => {
  const navigate = useNavigate();
  console.log("rendering page content");

  const handleClick = () => {
    console.log("Clicked!");
  };

  if (!pageContent) {
    console.error('Invalid page content:', pageContent);
    return null;
  }

  const renderElements = (elements: PageElement[]) => {
    if (!elements || elements.length === 0) {
      console.log('No sub elements');
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

      const { id, styling = {}, link, ...rest } = element;

      // Spread style properties directly into the component props
      return (
        link ? (
          <A key={index} href={link}>
            <Component key={index} styling={styling} id={id}>
              {renderElements((rest as PageElement).elements)}
              {rest.text}
            </Component>
          </A>
        ) : (
          <Component key={index} styling={styling} id={id}>
            {renderElements((rest as PageElement).elements)}
            {rest.text}
          </Component>
        )
      );
    });
  };

  return (
    <>
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



        const { id, styling = {}, link, elements: childElements, ...rest } = element;


        return (
          link ? (
            <A key={index} href={link}>
              <Component key={index} styling={styling} id={id}>
                {renderElements(childElements)}
                {rest.text}
              </Component>
            </A>
          ) : (
            <Component key={index} styling={styling} id={id}>
              {renderElements(childElements)}
              {rest.text}
            </Component>
          )
        )
      })}
    </>
  );
};

export default renderPageContent;