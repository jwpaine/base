import renderPageContent from '~/renderPageContent';
import { useSiteData } from '~/context/SiteDataContext';
import { useParams } from '@remix-run/react';

export default function Page() {
  // Get the site data, including all pages
  const { pages } = useSiteData();
  const { pageName } = useParams();  // 'pageName' matches the dynamic segment in the file name

  return (
    <div>
      {pageName && pages[pageName] ? (
        renderPageContent(pages[pageName])
      ) : (
        <div>Page not found</div>
      )}
    </div>
  );
}

