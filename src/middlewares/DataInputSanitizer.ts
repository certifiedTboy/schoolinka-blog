import { Request, Response, NextFunction } from "express";
const perfectExpressSanitizer = require("perfect-express-sanitizer");
import { UnprocessableError } from "../lib/exceptions";

/**
 * @class DataInputSanitizer
 */
class DataInputSanitizer {
  /**
   * @method sanitizeBlogInputData
   * @static
   * @param {string} title
   * @param {string} description
   * @param {string} category
   * @returns {void}
   */
  static async sanitizeBlogInputData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { title, description, content } = req.body;

    console.log(title, description, content);
    try {
      // Detecting SQL injection attempts:
      // Detecting XSS attempts:
      const titleHasXss = await perfectExpressSanitizer.detectXss(title);
      const titleHasSqlInjection =
        await perfectExpressSanitizer.detectSqlInjection(title, 5);
      const descHasXss = await perfectExpressSanitizer.detectXss(description);
      const descHasSqlInjection =
        await perfectExpressSanitizer.detectSqlInjection(description, 5);

      const contentHasXss = await perfectExpressSanitizer.detectXss(content);
      const contentHasSqlInjection =
        await perfectExpressSanitizer.detectSqlInjection(content, 5);

      if (
        titleHasXss ||
        titleHasSqlInjection ||
        descHasXss ||
        descHasSqlInjection ||
        contentHasXss ||
        contentHasSqlInjection
      ) {
        throw new UnprocessableError("something went wrong");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }
}

export default DataInputSanitizer;
