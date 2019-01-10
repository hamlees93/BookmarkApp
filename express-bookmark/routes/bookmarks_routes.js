const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const BookmarkController = require("../controllers/bookmark_controller");

router.post("/", celebrate({
    body: {
        title: Joi.string().required(),
        url: Joi.string().required()
    }
}), BookmarkController.create);

router.get("/", BookmarkController.index);

router.put("/:id", BookmarkController.edit); 

router.patch("/:id", BookmarkController.edit);

router.delete("/:id", BookmarkController.destroy);

module.exports = router;