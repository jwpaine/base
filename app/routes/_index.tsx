import { useLoaderData, useMatches} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useEffect, useState } from 'react';
import { useRouteLoaderData } from "@remix-run/react";
import { useOutletContext } from "@remix-run/react";
import { H1 } from "~/theme/components";
import { MetaData } from "~/types";
// Define a type for the data you expect from the loader


type LoaderData = {
  metadata: MetaData
};

export default function Index() {
  const { metadata } = useRouteLoaderData<LoaderData>("root");

  return (
    <main>
      <H1>
        {metadata.title}
      </H1>
    </main>
  );
}
