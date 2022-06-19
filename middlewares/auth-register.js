const db = require("../models");
const Joi = require("joi");
const User = db.user;

const checkReqBody = (req, res, next) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().pattern(new RegExp(pattern)).required(),
        role: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

const checkDuplicate = async(req, res, next) => {
    const user = await User.findOne({
        where: { email: req.body.email }
    });

    if(user) {
        return res.status(400).send({ message: "Email already exists!" });
    }
    next();
}

module.exports = {
    checkReqBody,
    checkDuplicate
}