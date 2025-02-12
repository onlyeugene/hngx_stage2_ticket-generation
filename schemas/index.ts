import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z
    .string()
    .min(5, "Email must be at least 5 characters long")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  profileImage: z.string().url("Invalid image URL"),
  about: z.string().min(10, "About must be at least 10 characters long"),
});
