import {NextFunction, Request, Response} from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  return next();
  return res.status(401).json({success: false, msg: "user not logged."});
}

export default authMiddleware;
