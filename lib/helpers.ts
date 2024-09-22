import prisma from "./db";

export function validateEmail(email: string):boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password strength ( min 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character)
export function validatePassword(password: string): boolean {
  const passwordMinLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= passwordMinLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
}