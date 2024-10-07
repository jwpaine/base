// app/routes/protected.tsx
import { LoaderFunction, redirect, json } from "@remix-run/node";
import { 
  useLoaderData,
  useActionData,
  Form,
  useFetcher, 
} from "@remix-run/react";

import { getSession } from "~/auth.server";
import {getSitesForOwner, getSiteData, updateSiteData } from "~/models/site.server"

import {Editor} from "~/theme/components"

import React from "react";

interface LoaderData {
    email: string;
    sites: any;
    siteData: JSON;
    domain: string;
}
interface ActionArgs {
  request: Request;
  params: { site: string };
}
// Define the loader to check authentication

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const email = session.get("email") as string
  // grab ?site= query param
  const domain = params.site as string
  const siteData = await getSiteData(domain) as JSON
  // Continue to render the protected page
  return json({ siteData, domain});
};

export async function action({ request, params }: ActionArgs) {
  
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const email = session.get("email") as string

  const formData = await request.formData();

  const siteData = formData.get("siteData")
  const domain = params.site as string

  console.log("update site data for ", domain)

  // validate that siteData is valid JSON:
  let data = null;
  try {
    data = JSON.parse(siteData as string)
  } catch (e) {
    return json({success: false, errors: ["Invalid JSON"]})
  }


  if (data) {
    const r = await updateSiteData(domain, email, data)

    return json({'success': true, 'errors' : null})
  }


}

export default function Site() {
 const { siteData, domain } = useLoaderData<LoaderData>();


 const site = useFetcher();


  return (
    <div>
      <h1>{domain}</h1>
     
      <site.Form method="post" action={`/admin/${domain}`}>
        <Editor 
          type="textarea"
          name="siteData" 
          defaultValue={JSON.stringify(siteData, null, 2)} 
        />
        <button type="submit">Save</button>
      </site.Form>
      <p>{JSON.stringify(site)}</p>
     

    </div>
  );
}
