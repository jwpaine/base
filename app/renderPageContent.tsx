import React from "react";
import { useNavigate, Link } from "@remix-run/react";
import { H1, Container, P, Button, Section, Header } from './theme/elements';



// Map the element type to the corresponding functional component
const componentMap: Record<string, React.ComponentType<any>> = {
  H1,
  P,
  Button,
  Container,
  Div: Container,
  Section,
  Header
};

const renderPageContent = (pageContent: any) => {
  const navigate = useNavigate();
  console.log("rendering page content");

  if (!pageContent) {
    console.error('Invalid page content:', pageContent);
    return null;
  }

  const renderElements = (elements: any[]): JSX.Element[] | null => {
    if (!elements || elements.length === 0) {
      console.log('No sub elements');
      return null;
    }

    return elements
      .map((element, index) => {
        if (!element || !element.type) {
          console.error('Invalid element:', element);
          return null;
        }

        // Lookup the component in componentMap, fallback to Container for 'div'
        const Component = componentMap[element.type] || (element.type === 'div' ? Container : null);
        if (!Component) {
          console.error('Unknown component type:', element.type);
          return null;
        }

        const { id, styling = {}, link, ...rest } = element;

        return link ? (
          <Link key={index} to={link}>
            <Component id={id} styling={styling}>
              {renderElements((rest as any).elements)}
              {rest.text}
            </Component>
          </Link>
        ) : (
          <Component key={index} id={id} styling={styling}>
            {renderElements((rest as any).elements)}
            {rest.text}
          </Component>
        );
      })
      .filter((element): element is JSX.Element => element !== null); // Filter out null values
  };

  return (
    <>
      {pageContent.map((element: any, index: number) => {
        if (!element || !element.type) {
          console.error('Invalid container element:', element);
          return null;
        }

        // Lookup the component in componentMap, fallback to Container for 'div'
        const Component = componentMap[element.type] || (element.type === 'div' ? Container : null);
        if (!Component) {
          console.error('Unknown container type:', element.type);
          return null;
        }

        const { id, styling = {}, link, elements: childElements, ...rest } = element;

        return link ? (
          <Link key={index} to={link}>
            <Component id={id} styling={styling}>
              {renderElements(childElements)}
              {rest.text}
            </Component>
          </Link>
        ) : (
          <Component key={index} id={id} styling={styling}>
            {renderElements(childElements)}
            {rest.text}
          </Component>
        );
      })}
    </>
  );
};

export default renderPageContent;
