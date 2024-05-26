const { Sequelize, DataTypes } = require("sequelize");

const options = {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
};

const sequelize = new Sequelize("sodality", "root", "", options);

const db = {};
// load models
db.User = require("./models/User")(sequelize, DataTypes);

db.sync = async () => {
  await db.User.sync();
};

module.exports = db;
