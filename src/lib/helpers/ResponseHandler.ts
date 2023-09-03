import C from "../constants";
import { Response } from "express";
import { HttpStatusCode } from "../constants/HttpStatusCode";

/**
 * @description
 * ```
 * import { ResponseHandler } from "@nestcoin/guildos-core";
 * ```
 * @class ResponseHandler
 */
export default class ResponseHandler {
  /**
   * @method send
   * @param {Response} res Express response object
   * @param {HttpStatusCode} statusCode Response status code
   * @param {object} [data] Response data
   * @param {string} [message] Optional response message
   * @memberOf ResponseHandler
   */
  static send(
    res: Response,
    statusCode: HttpStatusCode,
    data?: object,
    message: string = C.ResponseMessage.SUCCESS
  ) {
    return res.status(statusCode).json({ message: message, data });
  }

  /**
   * @method ok
   * @param {Response} res Express response object
   * @param {object} [data] Response data
   * @param {string} [message] Optional response message
   * @memberOf ResponseHandler
   */
  static ok(
    res: Response,
    data?: object,
    message: string = C.ResponseMessage.OK
  ) {
    return ResponseHandler.send(res, HttpStatusCode.SUCCESS, data, message);
  }

  /**
   * @method created
   * @param {Response} res Express response object
   * @param {object} [data] Response data
   * @param {string} [message] Optional response message
   * @memberOf ResponseHandler
   */
  static created(
    res: Response,
    data?: object,
    message: string = C.ResponseMessage.CREATED
  ) {
    return ResponseHandler.send(res, HttpStatusCode.CREATED, data, message);
  }
}
