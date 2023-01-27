import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./database.js";

import postsRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/', express.static("public"));
app.use('/images', express.static("images"));
app.use("/api/posts", postsRouter);
app.use("/api/user", userRouter);

connectDatabase()
  .then(() => app.listen(port, () => console.log(`listening at ${port}`)))
  .catch((error) => console.log(error.message));
