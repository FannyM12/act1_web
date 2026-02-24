const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "clave_super_secreta";

app.post("/base", (req, res) => {
  const { email, pass } = req.body;

  const token = jwt.sign(
    { email: email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
