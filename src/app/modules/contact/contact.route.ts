import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ContactController } from "./contact.controller";
import { ContactValidation } from "./contact.validation";
const router = express.Router();

router.post("/", validateRequest(ContactValidation.createContactZodSchema), ContactController.createContact);

router.get("/", ContactController.getAllContact);

router.get("/:id", ContactController.getSingleContact);

router.patch("/:id", validateRequest(ContactValidation.updateContactZodSchema), ContactController.updateContact);

router.delete("/:id", ContactController.deleteContact);

export const ContactRoutes = router;
