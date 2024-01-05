import { Model } from "mongoose";

export type IContact = {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    profile_picture: string;
    is_favorite: boolean;
};

export type ContactModel = Model<IContact, Record<string, unknown>>;

export type IContactFilters = { query?: string };
