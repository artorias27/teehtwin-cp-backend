const db = require("../models/index");
const jwt = require("jsonwebtoken");
const User = db.user;
const { SECRET_KEY } = require("../app/config/dbConfig");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization = "Bearer eyjksllsjdfklsjdl;"
    if(!authorization) {
        return res.status(401).send({ error: "You must be logged in." });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, SECRET_KEY, async(err, payload) => {
        if(err) return res.status(401).send({ error: "You must be logged in." });

        const { User_id } = payload;
        const user = await User.findByPk(User_id);
        req.user = user;
        next();
    })
}
