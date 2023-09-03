import express from "express";
import BlogController from "../controllers/blogController";
import DataInputSanitizer from "../middlewares/DataInputSanitizer";
import BlogValidator from "../middlewares/DataValidator";

const router = express.Router();

router.post(
  "/create",
  BlogValidator.checkCreateBlog(),
  BlogController.createNewBlog
);
router.get("/", BlogController.getAllBlogs);
router.get("/:blogId", BlogController.getABlog);
router.get("/blog/:blogTitle", BlogController.getABlog);
router.delete("/:blogId/delete", BlogController.deleteABlog);
router.put(
  "/:blogId/update",
  BlogValidator.checkCreateBlog(),
  BlogController.updateABlog
);

export default router;
