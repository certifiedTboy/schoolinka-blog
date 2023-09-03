import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
const sanitizer = require("perfect-express-sanitizer");
import { LoggerStream } from "./lib/helpers";
import * as path from "path";
import { GlobalErrorHandler } from "./lib/middlewares";
import apiV1 from "./routes";

const app: Express = express();

const allowedOrigins = ["http://localhost:3000"];
const expressOptions = {
  urlencodExtended: true,
  requestSizeLimit: "20mb",
};
const corsOption = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "X-Auth-Token",
    "Authorization",
    "Accept-Encoding",
    "Connection",
    "Content-Length",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: allowedOrigins,
  preflightContinue: false,
};

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(morgan("combined", { stream: LoggerStream }));
app.use(cors(corsOption));
app.use(express.json({ limit: expressOptions.requestSizeLimit }));
app.use(
  express.urlencoded({
    limit: expressOptions.requestSizeLimit,
    extended: expressOptions.urlencodExtended,
  })
);

// sanitize the body and query data of all incoming request for possible xss, noSql && sql attacks
const only = ["body", "query"];
app.use(
  sanitizer.clean(
    {
      xss: true,
      noSql: true,
      sql: true,
    },
    only
  )
);

app.use(express.static(path.join(process.cwd(), "public")));
app.use("/api/v1", apiV1);
app.use(GlobalErrorHandler);

export default app;