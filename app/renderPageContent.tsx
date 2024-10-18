import React from "react";
import { useNavigate, Link } from "@remix-run/react";
import { h1Style, containerStyle, pStyle, buttonStyle } from './styles.css';

// Helper function to ensure that styling is always an object
const ensureStyleObject = (styling: any): React.CSSProperties => {
  if (typeof styling !== 'object' || styling === null) {
    return {};
  }

  // Check if all keys are in camelCase
  for (const key in styling) {
    if (styling.hasOwnProperty(key)) {
      // If the key contains a hyphen (kebab-case), return {}
      if (key.includes('-')) {
        return {};
      }
    }
  }

  return styling;
};

// H1 component
const H1 = ({ id, styling, children }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode }) => {
  const style = ensureStyleObject(styling); // Ensure styling is an object
  return <h1 id={id} className={h1Style} style={style}>{children}</h1>;
};

// Container component
const Container = ({ id, styling, children }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode }) => {
  const style = ensureStyleObject(styling); // Ensure styling is an object
  return <div id={id} className={containerStyle} style={style}>{children}</div>;
};

// Paragraph component
const P = ({ id, styling, children }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode }) => {
  const style = ensureStyleObject(styling); // Ensure styling is an object
  return <p id={id} className={pStyle} style={style}>{children}</p>;
};

// Button component
const Button = ({ id, styling, children, onClick }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode; onClick?: () => void }) => {
  const style = ensureStyleObject(styling); // Ensure styling is an object
  return (
    <button id={id} className={buttonStyle} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

// Map the element type to the corresponding functional component
const componentMap: Record<string, React.ComponentType<any>> = {
  H1,
  P,
  Button,
  Container,
  Div: Container,
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
