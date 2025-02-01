import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
export const FormDataUserValidation = z.object({
  firstName : z.string({message: "First Name is required"}).min(1, {message:"First Name is required"}),
  email : z.string({message: "Email is required"}).email(),
  phone : z.string({message: "Phone is required"})
    .startsWith("+", { message: "Must Select country code" })
    .min(12, { message: "Phone must have 12 or more characters" }),
  address : z.string().min(1, {message:"Address is required"}),
  gender : z.string({message:"Gender is required"}),
  religion : z.string({message:"Religion is required"}),
  birtdayDate : z.date({message: "Birthday is required"}),
  password : z.string({message: "Password is required"}).min(8)
    .regex(passwordValidation, {message: 'Password must have number and special character'}),
  confirmationPassword : z.string({message: "Confirmation Password is required"}).min(8),
}).refine((data) => data.password === data.confirmationPassword, {
  message: "Passwords don't match",
  path: ["confirmationPassword"], // path of error
});

export const FormDataUserWithImageValidation = z.object({
  firstName : z.string({message: "First Name is required"}).min(1, {message:"First Name is required"}),
  email : z.string({message: "Email is required"}).email(),
  phone : z.string({message: "Phone is required"})
    .startsWith("+", { message: "Must Select country code" })
    .min(12, { message: "Phone must have 12 or more characters" }),
  address : z.string().min(1, {message:"Address is required"}),
  gender : z.string({message:"Gender is required"}),
  religion : z.string({message:"Religion is required"}),
  birtdayDate : z.date({message: "Birthday is required"}),
  password : z.string({message: "Password is required"}).min(8)
    .regex(passwordValidation, {message: 'Password must have number and special character'}),
  confirmationPassword : z.string({message: "Confirmation Password is required"}).min(8),
  image : z.string({message: "Must pick image for profile"}).min(1, {message:"Must pick image for profile"}),
}).refine((data) => data.password === data.confirmationPassword, {
  message: "Passwords don't match",
  path: ["confirmationPassword"], // path of error
});