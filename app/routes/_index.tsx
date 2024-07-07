import {
  Form,
  useLoaderData,
  useActionData,
  useFetcher,
} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";


import { createTheme, style, globalStyle } from '@vanilla-extract/css';
import { useState, useEffect } from 'react';


export async function loader({
  request,
}: LoaderFunctionArgs) {

    return null

}

export default function Index() {
  // content here not theme data const themeData = useLoaderData<ThemeData>();

  return (
    <main>
     Main
    </main>
  );
}