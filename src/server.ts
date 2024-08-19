import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.get("/", (_, res) => {
  res.status(200).send("api-gateway, bytewaveForum");
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
    target: `${process.env.AUTH_API_URI}/api/v1/user`,
  })
);

app.listen(8020, () => {
  console.log("server listens to port:8020");
});
