import renderPageContent from '../renderPageContent';
import { useSiteData } from '~/context/SiteDataContext';


export default function Index() {
  // Get the site data, including all pages
  const { pages } = useSiteData();
  return (
    <div>
      {renderPageContent(pages.home)}
    </div>
  );
}
