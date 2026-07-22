import { z } from "zod";

/**
 * Shared Zod schemas used by both the client-side forms (Login.jsx / Signup.jsx)
 * and the backend API routes (/api/auth/*). Keeping them in one place guarantees
 * the validation rules can never drift between frontend and backend.
 */

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be under 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be under 20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Helper: turns a Zod safeParse error into a flat { field: message } object,
// handy for wiring straight into form state.
export function flattenZodErrors(error) {
  const fieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] ?? "form";
    if (!fieldErrors[field]) fieldErrors[field] = issue.message;
  }
  return fieldErrors;
}
