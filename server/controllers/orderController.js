const pool = require("../config/db");

// Place order
const placeOrder = async (
    req,
    res
) => {

    try {

        const userId = req.user.id;

        const { total } = req.body;

        const newOrder = await pool.query(

            `INSERT INTO orders
            (user_id,total,status)

            VALUES($1,$2,$3)

            RETURNING *`,

            [
                userId,
                total,
                "Pending"
            ]

        );

        res.json(
            newOrder.rows[0]
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Server error"
        });

    }

};

// Get orders
const getOrders = async (
    req,
    res
) => {

    try {

        const orders = await pool.query(

            `SELECT * FROM orders
             WHERE user_id=$1
             ORDER BY id DESC`,

            [req.user.id]

        );

        res.json(
            orders.rows
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Server error"
        });

    }

};

// Update order status
const updateOrderStatus = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;

        const { status } =
            req.body;

        await pool.query(

            `UPDATE orders
             SET status=$1
             WHERE id=$2`,

            [status, id]

        );

        res.json({
            message:
                "Status updated"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Server error"
        });

    }

};
module.exports = {
    placeOrder,
    getOrders,
    updateOrderStatus
};