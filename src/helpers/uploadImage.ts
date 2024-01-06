import { v2 as cloudinary } from "cloudinary";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";

export async function uploadImage(image: string, folder: string) {
    const result = await cloudinary.uploader.upload(image, { folder: `CloudContact/${folder}` });
    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, "Failed To Upload Image");
    return result.secure_url;
}
