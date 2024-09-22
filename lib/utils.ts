import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SessionOptions } from "iron-session"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SessionData {
  userId?: string;
  email?: string;
  username?: string;
  password?: string;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  team?: string;
}

export const defaultSession: SessionData = {
  isLoggedIn: false
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }
}
