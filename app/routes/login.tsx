// app/routes/login.tsx
import { ActionFunction, json, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import React from "react";

import { getSession, commitSession } from "~/session.server";

interface ActionData {
    error?: string;
    success?: boolean;
  }

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

  console.log("logging in: ", email)

  const response = await fetch(`${AUTH0_DOMAIN}/oauth/token`, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "password",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      username: email,
      password,
      scope: "openid profile email",
    }),
  });

  const result = await response.json();
  if (response.ok) {
    // If login is successful, store the access token in the session
    let session = await getSession(request.headers.get("Cookie"));
    session.set("accessToken", result.access_token);
    session.set("email", email); // Store the email in the session


    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    // Return error data if login failed
    return json<ActionData>({ error: result.error_description || "Failed to log in" }, { status: 400 });
  }
};

export default function Login() {
    const actionData = useActionData<ActionData>();


  return (
    <div>
      <h1>Login</h1>
      <Form method="post">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </Form>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
    </div>
  );
}
