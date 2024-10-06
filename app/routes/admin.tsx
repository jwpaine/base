// app/routes/protected.tsx
import { LoaderFunction, redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/session.server";

import React from "react";

interface LoaderData {
    email: string;
  }
// Define the loader to check authentication
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const email = session.get("email");

  // If no access token, redirect to login page
  if (!accessToken) {
    return redirect("/login");
  }

  // Continue to render the protected page
  return json<LoaderData>({ email });
};

// Protected page component
export default function ProtectedPage() {
 const { email } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Admin portal</h1>
      <p>Logged in as {email}</p>
    </div>
  );
}
