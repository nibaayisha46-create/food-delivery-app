const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    addFood,
    addExternalFood,
    getFoods
} = require("../controllers/foodController");

// Add food
router.post(
    "/add",
    auth,
    admin,
    upload.single("image"),
    addFood
);

// Add external food to sync with cart
router.post(
    "/add-external",
    auth,
    addExternalFood
);

// Get foods
router.get(
    "/all",
    getFoods
);

module.exports = router;