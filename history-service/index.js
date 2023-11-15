const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");
const historyRouter = require("./routes/historyRouter");
app.use("/history", historyRouter);

const {errorHandler} = require("./middleware/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});