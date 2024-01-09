import { HttpError } from "../helpers/HttpError.js";

const isEmptyBody = (req, _, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    const isFavoritePath = req.path.includes("/favorite");
    const message = isFavoritePath ? "missing field favorite" : "missing fields";
    return next(HttpError(400, message));
  }
  next();
};

export default isEmptyBody;