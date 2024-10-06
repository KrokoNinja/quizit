import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SessionOptions } from 'iron-session';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: 'ajIfjKXGMYEB9gJkMCX2iyPVMDu9BlrBlGn2HcWXm8',
  cookieName: 'session',
  cookieOptions: {
    httpOnly: false,
    secure: false,
  },
};
