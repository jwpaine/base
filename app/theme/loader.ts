import base from '~/theme/sites/base/config';
import { MetaData, Theme } from '~/types';

interface DomainData {
  metadata: MetaData;
  theme: Theme;
}

const siteData: { [key: string]: DomainData } = {
  base: base,
};

export const getSiteData = (hostname: string) => {
  return siteData[hostname] || siteData['base'];
};

export default siteData;
