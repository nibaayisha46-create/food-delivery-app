const pool = require("../config/db");

// Add to cart
const addToCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            foodId,
            quantity
        } = req.body;

        const existingItem = await pool.query(

            `SELECT * FROM cart
             WHERE user_id=$1
             AND food_id=$2`,

            [userId, foodId]

        );

        if (
            existingItem.rows.length > 0
        ) {

            await pool.query(

                `UPDATE cart
                 SET quantity =
                 quantity + $1

                 WHERE user_id=$2
                 AND food_id=$3`,

                [
                    quantity,
                    userId,
                    foodId
                ]

            );

        } else {

            await pool.query(

                `INSERT INTO cart
                (user_id,food_id,quantity)

                VALUES($1,$2,$3)`,

                [
                    userId,
                    foodId,
                    quantity
                ]

            );

        }

        res.json({
            message:
                "Added to cart"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};

// Get cart items
const getCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const cartItems = await pool.query(

            `SELECT
                cart.id,
                foods.name,
                foods.price,
                foods.image,
                cart.quantity

             FROM cart

             JOIN foods
             ON cart.food_id = foods.id

             WHERE cart.user_id=$1`,

            [userId]

        );

        res.json(cartItems.rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};

// Remove item
const removeCartItem = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        await pool.query(

            "DELETE FROM cart WHERE id=$1",

            [id]

        );

        res.json({
            message: "Item removed"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};

module.exports = {
    addToCart,
    getCart,
    removeCartItem
};