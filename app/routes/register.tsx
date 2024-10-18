// app/routes/register.tsx
import { ActionFunction, json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import React from "react";
import { register } from "~/auth.server";
// Define the type for the action data
interface ActionData {
  error?: string;
  success?: boolean;
}

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await register(email as string, password as string, request);

  return result;
};

export default function Register() {
  // Use ActionData type for useActionData
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <h1>Register</h1>
      <Form method="post">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Register</button>
      </Form>
      {/* Check if actionData has an error */}
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      {actionData?.success && <p>Registration successful!</p>}
    </div>
  );
}
