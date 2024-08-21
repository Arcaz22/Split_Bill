import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/index";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use(express.json());

app.use(router);

export default app;
