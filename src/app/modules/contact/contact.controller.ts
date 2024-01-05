import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { contactFilterableFields } from "./contact.constant";
import { ContactService } from "./contact.service";

const createContact = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactService.createContact(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Contact created successfully",
        data: result,
    });
});

const getAllContact = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, contactFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await ContactService.getAllContacts(filters, paginationOptions);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Contacts retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getSingleContact = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ContactService.getSingleContact(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Contact retrieved successfully",
        data: result,
    });
});

const updateContact = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ContactService.updateContact(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Contact updated successfully",
        data: result,
    });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ContactService.deleteContact(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Contact deleted successfully",
        data: result,
    });
});

export const ContactController = {
    createContact,
    getAllContact,
    getSingleContact,
    updateContact,
    deleteContact,
};
