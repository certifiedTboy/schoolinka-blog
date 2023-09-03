import { UnprocessableError, NotFoundError } from "../lib/exceptions";
import Blog from "../database/models/Blog";

/*
 * @class blogService
 */
class blogService {
  /**
   * @method createBlog
   * @static
   * @async
   * @param {Request} req
   * @returns {Promise<Blog>}
   */
  static async createBlog(data: any): Promise<Blog> {
    const blog = await Blog.create(data);
    if (blog) {
      return blog;
    }
    throw new UnprocessableError("blog creation failed");
  }

  /**
   * @method getBlogs
   * @static
   * @async
   * @param {Request} req
   * @returns {Promise<Blog>}
   */
  static async getBlogs(skip: number, limit: number): Promise<Blog[]> {
    const blogs = await Blog.findAll({ offset: skip, limit });
    return blogs;
  }

  /**
   * @method getBlogById
   * @static
   * @async
   * @param {Request} req
   * @returns {Promise<Blog>}
   */
  static async getBlogById(blogId: string): Promise<Blog> {
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      throw new NotFoundError("blog does not exist");
    } else {
      return blog;
    }
  }

  /**
   * @method getBlogByTitle
   * @static
   * @async
   * @param {Request} req
   * @returns {Promise<Blog>}
   */
  static async getBlogByTitle(title: string): Promise<Blog> {
    const blog = await Blog.findOne({ where: { title } });

    if (!blog) {
      throw new NotFoundError("blog does not exist");
    } else {
      return blog;
    }
  }

  /**
   * @method deleteBlog
   * @static
   * @async
   * @param {Request} req
   * @returns {Promise<Blog>}
   */
  static async deleteBlog(blogId: string): Promise<number> {
    const blog = await Blog.destroy({
      where: {
        id: blogId,
      },
    });
    if (!blog) {
      throw new UnprocessableError("delete blog failed");
    } else {
      return blog;
    }
  }

  /**
   * @method updateBlog
   * @static
   * @async
   * @param {Request} req
   * @returns {Promise<Blog>}
   */
  static async updateBlog(data: any, blogId: string): Promise<number[]> {
    const { title, description, content } = data;
    const blog = await Blog.update(
      { title, description, content },
      {
        where: {
          id: blogId,
        },
      }
    );
    if (!blog) {
      throw new UnprocessableError("blog update failed");
    } else {
      return blog;
    }
  }
}

export default blogService;
