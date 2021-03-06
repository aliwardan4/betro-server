import { Request, Response, NextFunction } from "express";
import { isEmpty, trim } from "lodash";
import { userAccessed } from "../service/AccountService";
import { parseJwt } from "../service/LoginService";
import { errorResponse } from "../util/responseHandler";

export const authAccesstoken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  let authorization = req.headers.authorization;
  const cookie = req.cookies["token"];
  if (cookie != null && cookie.length > 0) {
    authorization = `Bearer ${cookie}`;
  }
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(401)
      .send(errorResponse(401, "Invalid Authorization Header"));
  }
  const jwt = trim(authorization.split("Bearer")[1]);
  try {
    const { user_id, access_token_id } = await parseJwt(jwt);
    if (isEmpty(user_id)) {
      return res.status(401).send(errorResponse(401, "Invalid jwt token"));
    }
    res.locals.user_id = user_id;
    userAccessed(access_token_id);
    next();
  } catch (e) {
    return res.status(401).send(errorResponse(401, "Invalid jwt token"));
  }
};
