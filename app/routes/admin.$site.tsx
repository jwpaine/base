// app/routes/protected.tsx
import { LoaderFunction, redirect, json } from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  Form,
  useFetcher,
  useNavigate,
} from "@remix-run/react";

import { getSession } from "~/auth.server";
import { getPreviewData, updatePreviewData, publishPreviewData } from "~/models/site.server"
import renderPageContent from "~/renderPageContent"
import { Container, Editor, Header, Main } from "~/theme/components"
import { Button } from "~/theme/components"

import React from "react";

interface LoaderData {
  email: string;
  sites: any;
  previewData: {
    pages: {
      [key: string]: any; // Allow dynamic string keys
    };
  };
  domain: string;
  status: string;
}
interface ActionArgs {
  request: Request;
  params: { site: string };
}
interface PreviewData {
  pages: {
    [key: string]: any; // Index signature to allow dynamic keys
  }
}
// Define the loader to check authentication

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const email = session.get("email") as string
  // grab ?site= query param
  const domain = params.site as string
  const siteData = await getPreviewData(domain, email)

  let previewData = siteData.preview
  let status = siteData.status

  console.log("previewData", previewData)
  // Continue to render the protected page
  return json({ previewData, status, domain });
};

export async function action({ request, params }: ActionArgs) {

  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const email = session.get("email") as string
  const formData = await request.formData();
  const domain = params.site as string

  const publish = formData.get("publish")

  if (publish) {
    console.log("Publishing site")
    const r = await publishPreviewData(domain, email)

    return json({ 'success': true, 'errors': null })
  }

  const previewData = formData.get("previewData")

  console.log("update site data for ", domain)

  // validate that siteData is valid JSON:
  let data = null;
  try {
    data = JSON.parse(previewData as string)
  } catch (e) {
    return json({ success: false, errors: ["Invalid JSON"] })
  }


  if (data) {
    const r = await updatePreviewData(domain, email, data)

    return json({ 'success': true, 'errors': null })
  }

  return json({ success: false, errors: ["Invalid JSON"] })


}

export default function Site() {
  const { previewData, status, domain } = useLoaderData<LoaderData>();

  const navigate = useNavigate();

  const site = useFetcher();




  // const publish = async () => {
  //   console.log("Publishing site");
  //   const response = await site.submit({ publish: true },
  //     { method: "post", action: `/admin/${domain}` }
  //   );
  // }


  return (
    <Main>
      <Header>
        <Button onClick={() => navigate("/admin")}>Back</Button>
        <h1>{domain}</h1>
        <span>Publish Status: {status}</span>
        {/* <button onClick={publish}>Publish</button> */}

      {/* <site.Form method="post" action={`/admin/${domain}`}>
        <input type="hidden" name="publish" value="true" />
        <button type="submit">Publish</button>
      </site.Form> */}

      <Button onClick={() => console.log("Publishing site")}>Publish</Button>
        <p>{JSON.stringify(site)}</p>
      </Header>


      {/* {renderPageContent(siteData.pages.home)} */}


      <Container styling={{
        width: "100%",
      }}>
        <site.Form method="post" action={`/admin/${domain}`}>
        
        <Editor
          type="textarea"
          name="previewData"
          defaultValue={JSON.stringify(previewData, null, 2)}
         
        />
        <button type="submit">Save</button>
      </site.Form>
      </Container>




    </Main>
  );
}
