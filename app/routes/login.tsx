// app/routes/login.tsx
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import React from "react";

import { getSession, commitSession, login, resetPassword } from "~/auth.server";

interface ActionData {
    error?: string;
    success?: boolean;
    message?: string;
  }

export let action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();
  const email = formData.get("email");
  const reset = formData.get("reset");

  if(reset) {
    console.log("resetting password for: ", email)
    // send reset email
    return await resetPassword(email as string);

  }

  const password = formData.get("password");
  // log user in using login function:
  const result = await login(email as string, password as string, request);

  return result

};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");

  // If no access token, redirect to login page
  if (accessToken) {
    return redirect("/admin");
  }

  return null

};

export default function Login() {
    const actionData = useActionData<ActionData>();
    const [resetPassword, setResetPassword] = React.useState(false);

  if(resetPassword) {
    return (
      <div>
        <h1>Reset Password</h1>
        <Form method="post">
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" required />
            <input type="hidden" name="reset" value="reset" />
          </div>
          <button type="submit">Reset Password</button>
        </Form>
        <button onClick={() => setResetPassword(false)}>Cancel</button>
        {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
        {actionData?.message && <p>{actionData.message}</p>}
      </div>
    );
  }

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
      <button onClick={() => setResetPassword(true)}>Reset Password</button>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
    </div>
  );
}
