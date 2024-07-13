import { useLoaderData, useMatches} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useEffect, useState } from 'react';
import { useRouteLoaderData } from "@remix-run/react";
import { useOutletContext } from "@remix-run/react";
import { H1 } from "~/theme/components";
// Define a type for the data you expect from the loader
type LoaderData = {
  domain: string;
};

export default function Index() {
 // const { theme } = useOutletContext<{ theme: Theme }>();
 // const { domain } = useRouteLoaderData("root") as LoaderData;

  return (
    <main>
      <H1>asd</H1>
    </main>
  );
}
