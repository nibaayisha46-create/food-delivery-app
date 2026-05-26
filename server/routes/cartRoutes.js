const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/authMiddleware");

const {
    addToCart,
    getCart,
    removeCartItem
} = require(
    "../controllers/cartController"
);

router.post(
    "/add",
    auth,
    addToCart
);

router.get(
    "/",
    auth,
    getCart
);

router.delete(
    "/remove/:id",
    auth,
    removeCartItem
);

module.exports = router;