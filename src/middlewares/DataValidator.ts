import { BodyValidator, CheckRequestValidation } from "../lib/middlewares";
/**
 * @class blogValidator
 */
class BlogValidator {
  /**
   * @method checkCreateBudget
   * @static
   * @returns {any[]}
   */
  static checkCreateBlog(): any[] {
    return [
      BodyValidator.checkNonEmptyString("title"),
      BodyValidator.checkNonEmptyString("description"),
      BodyValidator.checkNonEmptyString("content"),
      CheckRequestValidation(),
    ];
  }
}

export default BlogValidator;
