// app/utils/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node"
import { json, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET as string
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID as string
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET as string
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string

interface ActionData {
  error?: string;
  success?: boolean;
}

let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
})

export const login = async (email: string, password: string, request: Request) => {

  console.log("logging in: ", email)

  const response = await fetch(`${AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "password",
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
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
    return redirect("/admin", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    // Return error data if login failed
    return json({ error: result.error_description || "Failed to log in" }, { status: 400 });
  }
}

export const register = async (email: string, password: string, request: Request) => {
  console.log("registering: ", email)

  const response = await fetch(`${AUTH0_DOMAIN}/dbconnections/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: AUTH0_CLIENT_ID,
      email,
      password,
      connection: "Username-Password-Authentication",
    }),
  });

  const result = await response.json();
  if (response.ok) {
    return json({ success: true });
  } else {
    return json({ error: result.description || "Failed to register" }, { status: 400 });
  }
}

export const resetPassword = async (email: string) => {
  console.log("resetting password for: ", email)

  const response = await fetch(`${AUTH0_DOMAIN}/dbconnections/change_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: AUTH0_CLIENT_ID,
      email,
      connection: "Username-Password-Authentication",
    }),
  });

  const result = await response.text();

  if (response.ok) {
    return json({ message: result });
  } else {
    return json<ActionData>({ error: result || "Failed to send password reset email" }, { status: 400 });
  }
}

export const logout = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  // Destroy the session
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export let { getSession, commitSession, destroySession } = sessionStorage
