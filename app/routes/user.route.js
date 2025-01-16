module.exports = (app) => {
  const baseURL = process.env.BaseURL;
  const User = require("../controllers/user.controller");

  const router = require("express").Router();

  router.post("/auth/signup", User.signup);
  router.post("/auth/login", User.login);

  app.use(baseURL, router);
};
