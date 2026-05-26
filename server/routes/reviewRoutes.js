const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    addReview,
    getReviews

} = require(
    "../controllers/reviewController"
);

router.post(
    "/add",
    auth,
    addReview
);

router.get(
    "/:foodId",
    getReviews
);

module.exports =
    router;
