// app/routes/protected.tsx
import { LoaderFunction, redirect, json } from "@remix-run/node";
import { useLoaderData, useOutlet } from "@remix-run/react";
import { getSession } from "~/auth.server";

import {

  Outlet,

} from "@remix-run/react";

import {getSitesForOwner } from "~/models/site.server"



import React from "react";

interface LoaderData {
    email: string;
    sites: any;
  }
// Define the loader to check authentication
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const email = session.get("email") as string

  // If no access token, redirect to login page
  if (!accessToken) {
    return redirect("/login");
  }

  const sites = await getSitesForOwner(email);

  // Continue to render the protected page
  return json<LoaderData>({ email, sites });
};

// Protected page component

const generateSiteList = (sites: any, setManageSite: any) => {
  return sites.map((site: any) => {
    return (
      <div key={site.domain}>
        <a href={`/admin/${site.domain}`}>{site.domain}</a>
      </div>
    );
  });
}

export default function ProtectedPage() {
 const { email, sites} = useLoaderData<LoaderData>();

 const [manageSite, setManageSite] = React.useState(false);

 const outlet = useOutlet(); // Check if there's an Outlet

 // If there is an outlet, render it
 if (outlet) {
   return <Outlet />;
 }

  return (
    <main>
      <header>
      <h1>Admin portal</h1>
      <p>Logged in as {email}</p>
      <h2>My sites</h2>
      {generateSiteList(sites, setManageSite)}
      </header>
      
    </main>
  );
}
