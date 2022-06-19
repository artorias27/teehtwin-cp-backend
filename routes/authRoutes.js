const express = require("express");
const authController = require("../controllers/authController");
const { checkReqBody, checkDuplicate } = require("../middlewares/auth-register");
const authenticate = require("../middlewares/require-auth");
const router = express.Router();

router.post("/signin", authController.signin);
router.post("/register", checkReqBody, checkDuplicate, authController.register);
router.get("/getUser", authenticate, authController.testProtectedRoute)

module.exports = router;