// context/SiteDataContext.tsx
import React, { createContext, useContext } from 'react';
import type { SiteData } from '~/types';

const SiteDataContext = createContext<SiteData | undefined>(undefined);

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};

export const SiteDataProvider: React.FC<{ children: React.ReactNode; siteData: SiteData }> = ({ children, siteData }) => {
  return (
    <SiteDataContext.Provider value={siteData}>
      {children}
    </SiteDataContext.Provider>
  );
};
