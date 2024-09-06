import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";
import swaggerDocs from './utils/config-swagger';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());

app.use(router);
swaggerDocs(app);

export default app;
