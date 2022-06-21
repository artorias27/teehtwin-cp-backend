const db = require("../models");
const Joi = require("joi");
const User = db.user;

const checkSignInReq = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(401).send(error.details[0].message);
    }
    next();
}

const checkSignUpReq = (req, res, next) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().pattern(new RegExp(pattern)).required(),
        role: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(401).send(error.details[0].message);
    }
    next();
}

const checkEmailExist = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email }});
    if(user === null) {
        return res.status(401).send({ message: "Email Not Found!"});
    }
    req.body = { ...user.toJSON(), plainPassword: req.body.password };
    next();
};

const checkDuplicate = async (req, res, next) => {
    const user = await User.findOne({
        where: { email: req.body.email }
    });
    if (user) {
        return res.status(401).send({ message: "Email already exists!" });
    }
    next();
}

module.exports = {
    checkSignUpReq,
    checkSignInReq,
    checkEmailExist,
    checkDuplicate
}