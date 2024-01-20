const { Router } = require("express");
const router = Router();

const { createUser, login } = require("../controllers/userController");

router.post("/signUp", createUser);
router.post("/login", login);

module.exports = router;
