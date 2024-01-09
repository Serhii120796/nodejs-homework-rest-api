import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId, authenticate } from "../../middleware/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post("/", contactsController.add);

contactsRouter.put("/:id", isValidId, isEmptyBody, contactsController.updateById);

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, contactsController.updateStatusContact);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
