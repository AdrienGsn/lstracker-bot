import express from "express";
import { logger } from "./lib/logger";

const app = express();

app.get("/", (_, res) => res.send("Bot en ligne"));

app.listen(3000, () => logger.info("Keep-alive server lance"));
