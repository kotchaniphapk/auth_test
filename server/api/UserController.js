const bcrypt = require("bcrypt");

const db = require("../db/config");

module.exports = (app) => {
  app.get("/users", async (req, res) => {
    const users = await db.User.findAll();
    return res.json(users);
  });

  app.post("/users", async (req, res) => {
    const stuffFromTheClient = req.body;
    try {
      const match = await db.User.findOne({ where: { email: stuffFromTheClient.email } });
      if (match) {
        throw new Error("email already exists");
      }
      if (!match) {
        const user = await db.User.create({
          name: stuffFromTheClient.name,
          email: stuffFromTheClient.email,
          password: stuffFromTheClient.password,
        });
        return res.json(user);
      }
    } catch (e) {
      return res.status(400).send(e);
    }
  });

  app.post("/users/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({ where: { email } });
      if (!user || !user.email) {
        throw new Error("Wrong email or password");
      }

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return res.json({
          id: user.id,
          name: user.name,
          email: user.email,
        });
      }
      return res.status(400).send(e);
    } catch (e) {
      return res.status(400).send(e);
    }
  });

  return (req, res, next) => {
    next();
  };
};
