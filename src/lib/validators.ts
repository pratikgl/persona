import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const addPersonSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  relationship: z.enum(["partner", "friend", "family", "other"]),
});

export const addMemorySchema = z.object({
  personId: z.string().uuid(),
  rawInput: z.string().min(1, "Tell us something").max(5000),
});
