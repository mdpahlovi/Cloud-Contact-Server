import { z } from "zod";

const createContactZodSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is Required" }),
        email: z.string(),
        phone_number: z.string({ required_error: "Phone Number is Required" }),
        address: z.string({ required_error: "Address is Required" }),
        profile_picture: z.string({ required_error: "Profile Picture is Required" }),
    }),
});

const updateContactZodSchema = z.object({
    body: z
        .object({
            name: z.string(),
            email: z.string(),
            phone_number: z.string(),
            address: z.string(),
            profile_picture: z.string(),
            is_favorite: z.boolean(),
        })
        .partial()
        .refine(
            ({ name, email, phone_number, address, profile_picture, is_favorite }) =>
                name !== undefined ||
                email !== undefined ||
                phone_number !== undefined ||
                address !== undefined ||
                profile_picture !== undefined ||
                is_favorite !== undefined,
            { message: "Nothing to update" },
        ),
});

export const ContactValidation = {
    createContactZodSchema,
    updateContactZodSchema,
};
