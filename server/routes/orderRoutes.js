const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/authMiddleware");

const admin =
    require("../middleware/adminMiddleware");

const {
    placeOrder,
    getOrders,
    updateOrderStatus
} = require(
    "../controllers/orderController"
);

router.post(
    "/place",
    auth,
    placeOrder
);

router.get(
    "/my-orders",
    auth,
    getOrders
);

router.put(
    "/update/:id",
    auth,
    admin,
    updateOrderStatus
);

module.exports = router;