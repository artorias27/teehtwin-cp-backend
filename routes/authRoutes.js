const express = require("express");
const authController = require("../controllers/authController");
const { checkReqBody, checkDuplicate } = require("../middlewares/auth-register");
const router = express.Router();

router.get("/signin", authController.signin);
router.post("/register", checkDuplicate, checkReqBody, authController.register);

module.exports = router;