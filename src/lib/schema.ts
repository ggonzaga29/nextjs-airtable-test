import { z } from "zod";

export const applicantFormSchema = z.object({
  job_position: z.string(),
  name: z.string().min(3, "Name is too short").max(100, "Name is too long").trim(),
  email: z.string().email().trim(),
  phone: z.string().min(10, "Phone number is too short").max(15, "Phone number is too long").trim(),
  short_description: z.string().trim(),
  date_of_birth: z.coerce.date(),
});

export type ApplicantFormSchema = z.infer<typeof applicantFormSchema>;
