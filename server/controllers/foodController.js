const pool = require("../config/db");

const addFood = async (req, res) => {
    try {
        const {
            name,
            price,
            category
        } = req.body;

        const image =
            req.file.path;
        const newFood = await pool.query(
            `INSERT INTO foods (name,price,image) VALUES($1,$2,$3) RETURNING *`,
            [name, price, image]
        );
        res.status(201).json({ message: "Food added", food: newFood.rows[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const addExternalFood = async (req, res) => {
    try {
        const { name, price, image } = req.body;

        // Check if it already exists
        const existing = await pool.query("SELECT * FROM foods WHERE name=$1", [name]);
        if (existing.rows.length > 0) {
            return res.json({ food: existing.rows[0] });
        }

        const newFood = await pool.query(
            `INSERT INTO foods (name,price,image) VALUES($1,$2,$3) RETURNING *`,
            [name, price, image]
        );
        res.status(201).json({ food: newFood.rows[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getFoods = async (req, res) => {
    try {
        const foods = await pool.query("SELECT * FROM foods");
        res.json(foods.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM foods WHERE id=$1", [id]);
        res.json({ message: "Food deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addFood,
    addExternalFood,
    getFoods,
    deleteFood
};