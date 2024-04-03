const express = require("express");
const { signUp, login, getUserDetails, forgetPassword, resetPassword } = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login",  login);
router.get("/userDetail", authMiddleware,  getUserDetails)
router.post("/forgetPassword", forgetPassword)
router.post("/resetPassword/:token", resetPassword)

module.exports = router;