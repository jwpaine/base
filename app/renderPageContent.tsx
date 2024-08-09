import { H1, Container, Main, Cloud } from "~/theme/components";
import type { MetaData, LoaderData, PageContent, PageElement} from "~/types";

const componentMap: Record<string, React.ComponentType<any>> = {
    H1: H1,
    Container: Container,
    Cloud: Cloud,
  };
  
  const renderPageContent = (pageContent: PageContent) => {
    console.log("rendering page content");
    if (!pageContent) {
      console.error('Invalid page content:', pageContent);
      return <main>No content available</main>;
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
  
        const { styling = {}, ...rest } = element;

        console.log('styling: ', JSON.stringify(styling));
  
        // Spread style properties directly into the component props
        return (
          <Component key={index} styling={styling}>
            {renderElements((rest as PageElement).elements)}
            {rest.text}
          </Component>
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

          console.log('element: ', JSON.stringify(element));
  
          const { styling = {}, elements: childElements, ...rest } = element;

          console.log('styling: ', JSON.stringify(styling));
  
          return (
            <Component key={index} styling={styling}>
              {renderElements(childElements)}
              {rest.text}
            </Component>
          );
        })}
     </>
    );
  };

  export default renderPageContent;