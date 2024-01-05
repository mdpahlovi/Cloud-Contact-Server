import { Schema, model } from "mongoose";
import { ContactModel, IContact } from "./contact.interface";

const contactSchema = new Schema<IContact>(
    {
        name: { type: String, required: true },
        email: { type: String },
        phone_number: { type: String, required: true },
        address: { type: String, required: true },
        profile_picture: { type: String, required: true },
        is_favorite: { type: Boolean, required: true, default: false },
    },
    { timestamps: true, versionKey: false },
);

export const Contact = model<IContact, ContactModel>("Contact", contactSchema);
