const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use("/api/auth", authRoutes);

const db = require("./models/index");

// db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});