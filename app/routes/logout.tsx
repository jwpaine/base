// app/routes/logout.tsx
import { LoaderFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  // Get the current session
  const session = await getSession(request.headers.get("Cookie"));

  // Destroy the session
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function Logout() {
  return null; // Nothing to render, the loader handles everything
}