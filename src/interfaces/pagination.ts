import { SortOrder } from "mongoose";

export type IPaginationOptions = {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
};
