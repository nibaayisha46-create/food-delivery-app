const auth = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const {
  register,
  login
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.get("/", (req,res)=>{
   res.send("Auth route working");
});
router.get(
 "/profile",
 auth,
 (req,res)=>{

   res.json({
      message:"Protected route accessed",
      user:req.user
   });

 });

module.exports = router;