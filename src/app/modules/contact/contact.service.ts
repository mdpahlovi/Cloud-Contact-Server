import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { searchHelper } from "../../../helpers/searchHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { contactSearchableFields } from "./contact.constant";
import { IContact, IContactFilters } from "./contact.interface";
import { Contact } from "./contact.model";

const createContact = async (payload: IContact) => {
    const newContact = new Contact(payload);
    const result = await newContact.save();

    return result;
};

const getAllContacts = async (filters: IContactFilters, paginationOptions: IPaginationOptions) => {
    const { query } = filters;
    const { page, size, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    // Find Conditions
    const andConditions = [];
    if (query) andConditions.push(searchHelper(contactSearchableFields, query));

    // Sort Conditions
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Contact.find(whereConditions).sort(sortConditions).skip(skip).limit(size);
    const total = await Contact.countDocuments(whereConditions);

    return { meta: { page, size, total }, data: result };
};

const getSingleContact = async (id: string) => {
    const result = await Contact.findById(id);

    return result;
};

const updateContact = async (id: string, payload: Partial<IContact>) => {
    const result = await Contact.findByIdAndUpdate(id, payload, { new: true });

    return result;
};

const deleteContact = async (id: string) => {
    const result = await Contact.findByIdAndDelete(id);

    return result;
};

export const ContactService = {
    createContact,
    getAllContacts,
    getSingleContact,
    updateContact,
    deleteContact,
};
