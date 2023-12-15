import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middleware/isEmptyBody";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post("/", contactsController.add);

contactsRouter.delete("/:id", contactsController.deleteById);

contactsRouter.put("/:id", isEmptyBody, contactsController.updateById);

export default contactsRouter;
