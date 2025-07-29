const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.use("/api/todos", require("./routes/todo"));

// Dummy auth route (optional, if you want to include login/register)
app.post("/api/login", (req, res) => {
  const { email } = req.body;
  const token = require("jsonwebtoken").sign(
    { id: email },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
