const mongoose = require("mongoose");

/*--------- Connect to DB ----------------*/
mongoose.connect(
  "mongodb://localhost:27017/login-app-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

module.exports = mongoose;
