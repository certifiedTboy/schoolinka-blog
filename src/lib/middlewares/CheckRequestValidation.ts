import { BadRequestError } from "../exceptions";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 *
 * @description
 * This middleware checks for all validation errors and throw a BadRequestError error if validation errors exists
 *
 * @function CheckRequestValidations
 * @param {string} [message=Invalid request data] General error message to return
 * @return {function(Request, Response, NextFunction): null} Middleware to terminate request when validation fails
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CheckRequestValidation =
  (message?: string) => (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(message || "Invalid request data", {
        metaData: errors,
      });
    }
    next();
  };

export default CheckRequestValidation;
