// routes/_index.tsx
import { useRouteLoaderData } from "@remix-run/react";
import { H1 } from "~/theme/components";
import { MetaData } from "~/types";

// Define a type for the data you expect from the loader
type LoaderData = {
  metadata: MetaData
};

export default function Index() {
  const { metadata } = useRouteLoaderData<LoaderData>("root") || { metadata: { title: "Default Title" } };

  return (
    <main>
      <H1>
        {metadata.title}
      </H1>
    </main>
  );
}
