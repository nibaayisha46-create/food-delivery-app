const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http =
    require("http");

const {
    Server
} = require("socket.io");


const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes =
    require("./routes/reviewRoutes");
const favoriteRoutes =
    require("./routes/favoriteRoutes");
const aiRoutes =
    require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use(
    "/uploads",
    express.static("uploads")
);
app.use(
    "/api/reviews",
    reviewRoutes
);
app.use(
    "/api/favorites",
    favoriteRoutes
);
app.use(
    "/api/ai",
    aiRoutes
);
app.get("/", async (req, res) => {

    try {

        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Food Delivery API Running",
            dbTime: result.rows[0]
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Database connection failed"
        });

    }

});

const PORT = process.env.PORT || 5000;

const server =
    http.createServer(app);

const io =
    new Server(server, {

        cors: {
            origin:
                "http://localhost:3000",

            methods:
                ["GET", "POST"]
        }

    });

server.listen(

    5000,

    () => {

        console.log(
            "Server Running"
        );

    }

);