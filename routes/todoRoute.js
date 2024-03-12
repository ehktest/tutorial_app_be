"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  destroy,
} = require("../controllers/todoController");
const idValidation = require("../middlewares/idValidation");

router.route("/").get(list).post(create);

router
  .route("/:todoId(\\w+)")
  .all(idValidation)
  .get(read)
  .put(update)
  .patch(update)
  .delete(destroy);

module.exports = router;
