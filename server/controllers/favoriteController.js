const pool =
    require("../config/db");

// Add Favorite
const addFavorite = async (
    req,
    res
) => {

    try {

        const userId =
            req.user.id;

        const { foodId } =
            req.body;

        await pool.query(

            `INSERT INTO favorites
            (user_id,food_id)

            VALUES($1,$2)`,

            [
                userId,
                foodId
            ]

        );

        res.json({
            message:
                "Added to favorites"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Server error"
        });

    }

};

// Get Favorites
const getFavorites = async (
    req,
    res
) => {

    try {

        const favorites =
            await pool.query(

                `SELECT favorites.*,
            foods.name,
            foods.price,
            foods.image

            FROM favorites

            JOIN foods
            ON favorites.food_id =
            foods.id

            WHERE favorites.user_id=$1`,

                [req.user.id]

            );

        res.json(
            favorites.rows
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Server error"
        });

    }

};

// Remove Favorite
const removeFavorite = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;

        await pool.query(

            `DELETE FROM favorites
            WHERE id=$1`,

            [id]

        );

        res.json({
            message:
                "Removed favorite"
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

    addFavorite,
    getFavorites,
    removeFavorite

};