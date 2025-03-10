const express = require("express");
const dotenv = require("dotenv");
const patentsRoutes = require("./routes/patents");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/patents", patentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});