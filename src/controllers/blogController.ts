import { Request, Response, NextFunction } from "express";
import blogService from "../services/blogService";
import { getPagination } from "../utils/pagination/pagination";
import { ResponseHandler } from "../lib/helpers";
import { IBlog } from "../interfaces";

/**
 * @class blogController
 */
class BlogController {
  /**
   * @method createBlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async createNewBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blogData: IBlog = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
      };

      const createdBlog = await blogService.createBlog(blogData);
      ResponseHandler.created(res, createdBlog, "success");
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getAllBlogs
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getAllBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { skip, limit } = getPagination(req.query);
      const blogs = await blogService.getBlogs(skip, limit);
      ResponseHandler.ok(res, blogs, "success");
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method getABlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getABlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogId, blogTitle } = req.params;

      if (blogId) {
        const blog = await blogService.getBlogById(blogId);
        ResponseHandler.ok(res, blog, "success");
      } else {
        const blog = await blogService.getBlogByTitle(blogTitle);
        ResponseHandler.ok(res, blog, "success");
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method deletABlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async deleteABlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogId } = req.params;
      const deleteBlog = await blogService.deleteBlog(blogId);
      ResponseHandler.ok(res, undefined, "Post deleted successfully");
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method updateABlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   *
   * @returns {array}
   */
  static async updateABlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogId } = req.params;
      const blogData: IBlog = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
      };
      const deleteBlog = await blogService.updateBlog(blogData, blogId);
      ResponseHandler.ok(res, undefined, "Post updated successfully");
    } catch (err) {
      next(err);
    }
  }
}

export default BlogController;
