import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isEmptyFavorite } from "../../middleware/isEmptyBody";
import { isValidId } from "../../middleware/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post("/", contactsController.add);

contactsRouter.put("/:id", isValidId, isEmptyBody, contactsController.updateById);

contactsRouter.patch("/:id/favorite", isValidId, isEmptyFavorite, contactsController.updateStatusContact);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
