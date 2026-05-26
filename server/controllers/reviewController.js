const pool =
    require("../config/db");

// Add Review
const addReview = async (
    req,
    res
) => {

    try {

        const userId =
            req.user.id;

        const {
            foodId,
            rating,
            comment
        } = req.body;

        await pool.query(

            `INSERT INTO reviews
            (user_id,food_id,rating,comment)

            VALUES($1,$2,$3,$4)`,

            [
                userId,
                foodId,
                rating,
                comment
            ]

        );

        res.json({
            message:
                "Review added"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Server error"
        });

    }

};

// Get Reviews
const getReviews = async (
    req,
    res
) => {

    try {

        const { foodId } =
            req.params;

        const reviews =
            await pool.query(

                `SELECT reviews.*,
            users.name

            FROM reviews

            JOIN users
            ON reviews.user_id =
            users.id

            WHERE food_id=$1

            ORDER BY id DESC`,

                [foodId]

            );

        res.json(
            reviews.rows
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Server error"
        });

    }

};

module.exports = {
    addReview,
    getReviews
};