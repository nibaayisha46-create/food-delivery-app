const pool = require("../config/db");
const admin = async (
    req,
    res,
    next
) => {

    try {

        const user = await pool.query(

            "SELECT * FROM users WHERE id=$1",

            [req.user.id]

        );

        if (
            !user.rows[0].is_admin
        ) {

            return res.status(403).json({
                message:
                    "Admin access only"
            });

        }

        next();

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Server error"
        });

    }

};

module.exports = admin;