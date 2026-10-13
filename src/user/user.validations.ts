import {  z } from 'zod';
export const reportSchema = z.object({
    type: z.enum([
        "Earthquake",
        "School Fire",
        "Armed Violence"
    ]),
    location: z.string().min(1)
});
export const accountSetupSchema = z.object({
    occupation: z.enum(["Student", "Professor", "PLMUN Dean", "Non-Teaching Staff"]),
    program: z.enum([
  "College of Arts and Sciences",
  "College of Business Administration",
  "College of Criminal Justice",
  "College of Information Technology and Computer Studies",
  "College of Teacher Education",
  "Graduate School",
  "None"
]),
  bio: z.string().min(1)
});
export const buddySchema = z.object({
   buddy: z.string(),
   name: z.string().min(1)
});
export const requestSchema = z.object({
  location:  z.string().min(1),
  details: z.string().min(1),
  name: z.string().min(1)
});