// app/routes/logout.tsx
import { LoaderFunction, redirect } from "@remix-run/node";
import { logout } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const r = await logout(request);
  return r;
};

export default function Logout() {
  return null; // Nothing to render, the loader handles everything
}