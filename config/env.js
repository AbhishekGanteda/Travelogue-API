require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_NAME: process.env.DB_NAME || "travelogue_db",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_DIALECT: process.env.DB_DIALECT || "mysql",
  JWT_SECRET: process.env.JWT_SECRET || "your_secret_key",
};
