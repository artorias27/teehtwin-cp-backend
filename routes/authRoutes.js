const express = require("express");
const authController = require("../controllers/authController");
const { checkSignInReq, checkEmailExist, checkSignUpReq, checkDuplicate } = require("../middlewares/auth-register");
const authenticate = require("../middlewares/require-auth");
const router = express.Router();

router.post("/signin", checkSignInReq, checkEmailExist, authController.signin);
router.post("/register", checkSignUpReq, checkDuplicate, authController.register);
router.get("/getUser", authenticate, authController.testProtectedRoute)

module.exports = router;