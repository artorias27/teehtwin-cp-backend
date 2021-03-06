const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { SECRET_KEY } = require("../app/config/dbConfig");

const User = db.user;

const signin = async (req, res) => {
    const { id, password, plainPassword } = req.body;
    try {
        const match = await bcrypt.compare(plainPassword, password)
        if(!match) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        const token = jwt.sign({ User_id: id }, SECRET_KEY, { expiresIn: "10h" });
        res.status(200).send({ token });
    } catch(err) {
        return res.status(422).send(err.message);
    }
};

const register = async (req, res) => {
    const saltRounds = 10;
    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        const user = await User.create(req.body);
        // const token = jwt.sign({ User_id: user.id }, SECRET_KEY, { expiresIn: "10h" });
        // res.status(201).send({ ...user.toJSON(), token });
        res.status(201).send(user.toJSON());
    } catch(err) {
        return res.status(422).send(err.message);
    }
   
};

const testProtectedRoute = (req, res) => {
    console.log(req);
    res.send("It's me");
}

module.exports = {
    signin,
    register,
    testProtectedRoute
}