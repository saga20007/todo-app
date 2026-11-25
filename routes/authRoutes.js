const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

module.exports = router;
//mongodb+srv://alexsadeu24_db_user:arsenal_2007@cluster0.lkogwsy.mongodb.net/todolist