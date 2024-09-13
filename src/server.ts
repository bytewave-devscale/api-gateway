import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.static("/public"));

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.use(
  "/api/v1/user",
  createProxyMiddleware({
    target: `${process.env.USER_API_URI}/api/v1/user`,
  })
);

app.use(
  "/api/v1/auth",
  createProxyMiddleware({
    target: `${process.env.AUTH_API_URI}/api/v1/auth`,
  })
);

app.use(
  "/api/v1/thread",
  createProxyMiddleware({
    target: `${process.env.THREAD_API_URI}/api/v1/thread`,
  })
);

app.use(
  "/api/v1/reply",
  createProxyMiddleware({
    target: `${process.env.REPLY_API_URI}/api/v1/reply`,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`server listens to port:${process.env.PORT}`);
});
