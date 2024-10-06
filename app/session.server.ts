// app/utils/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";
const SESSION_SECRET = process.env.SESSION_SECRET as string;
let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
