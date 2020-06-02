require("dotenv").config();

module.exports = {
  MondoDB: {
    // url: "mongodb://questify:goit34GH@127.0.0.1:27017/questify"
    url: process.env.MONGO_DB_URI || "mongodb://localhost:27017/dev-questify"
  },
  client: {
    development: {
      url: "http://localhost",
      port: "3000"
    }
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY || "jwt_please_change",
  jwtExpiration: process.env.JWT_EXPIRATION || 10000
};
