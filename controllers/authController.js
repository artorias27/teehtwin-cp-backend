const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { SECRET_KEY } = require("../app/config/dbConfig");

const User = db.user;

const signin = (req, res) => {

};

const register = async(req, res) => {
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.create(req.body);
    const token = jwt.sign({ User_id: user.id }, SECRET_KEY, { expiresIn: "10h" });
    res.status(201).send({...user.toJSON(), token});
};

module.exports = {
    signin,
    register
}