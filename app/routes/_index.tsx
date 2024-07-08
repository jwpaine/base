import { useLoaderData, useMatches} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useEffect, useState } from 'react';
import { useRouteLoaderData } from "@remix-run/react";
// Import domain-specific components

import {index as base} from "~/theme/sites/base";
import {index as localhost} from "~/theme/sites/localhost";

// Define a type for the data you expect from the loader
type LoaderData = {
  domain: string;
};


// export async function loader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
//   // For simplicity, we'll randomly choose a domain
//   // const domains = ['localhost', 'base'];
//   // const domain = domains[Math.floor(Math.random() * domains.length)];
  

//   // return { domain };
//   return null
// }

// export const useRouteData = (routeId: string) => {
//   const matches = useMatches()
//   const data = matches.find((match) => match.id === routeId)?.data

//   return data || undefined
// }

export default function Index() {

  const { domain } = useRouteLoaderData("root") as LoaderData;
  // Map domain names to components
  const components: { [key: string]: React.ComponentType } = {
    localhost,
    base
  };

  // Get the component by name
  const Component = components[domain];

  if (!Component) {
    return <div>Error: Component not found</div>;
  }

  return (
    <main>
      <Component />
    </main>
  );
}




// import {
//   Form,
//   useLoaderData,
//   useActionData,
//   useFetcher,
// } from "@remix-run/react";
// import { LoaderFunctionArgs } from "@remix-run/node";


// import { createTheme, style, globalStyle } from '@vanilla-extract/css';
// import { useState, useEffect } from 'react';


// export async function loader({
//   request,
// }: LoaderFunctionArgs) {

//     return null

// }

// export default function Index() {
//   // content here not theme data const themeData = useLoaderData<ThemeData>();

//   return (
//     <main>
//      Main
//     </main>
//   );
// }