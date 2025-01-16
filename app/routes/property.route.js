module.exports = (app) => {
  const baseURL = process.env.BaseURL;
  const property = require("../controllers/property.controller");
  const isAuthenticated = require("../middlewares/auth.middleware");
  const upload = require("../middlewares/upload.middleware");

  const router = require("express").Router();

  router.post("/property/create", upload.single("photo"), property.create);
  router.get("/property/getAll", property.getAll);
  router.get("/property/getById/:id", property.getById);
  router.get("/property/getByUserId/:user_id", property.getByUserId);
  router.put(
    "/property/updateById/:id",
    upload.single("photo"),
    property.updateById
  );
  router.delete("/property/deleteById/:id", property.deleteById);
  router.delete("/property/deleteAll", property.removeAll);

  // app.use(isAuthenticated);
  app.use(baseURL, router);
};
