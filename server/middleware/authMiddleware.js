const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");

        if (!authHeader) {

            return res.status(401).json({
                message: "No token"
            });

        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.replace("Bearer ", "")
            : authHeader;

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verified;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};

module.exports = auth;