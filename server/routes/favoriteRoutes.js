const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    addFavorite,
    getFavorites,
    removeFavorite

} = require(
    "../controllers/favoriteController"
);

router.post(
    "/add",
    auth,
    addFavorite
);

router.get(
    "/",
    auth,
    getFavorites
);

router.delete(
    "/:id",
    auth,
    removeFavorite
);

module.exports =
    router;