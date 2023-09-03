import express from "express";
import { NotFoundHandler } from "../lib/middlewares";
import RootRoute from "./RootRoute";
import blogRoutes from "./blogRoutes";

const apiV1 = express.Router();

apiV1.use("/", RootRoute);
apiV1.use("/blogs", blogRoutes);
apiV1.use(NotFoundHandler);

export default apiV1;
