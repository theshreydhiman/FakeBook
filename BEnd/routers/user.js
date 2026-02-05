const express = require("express");
const { User } = require("../user");
const router = new express.Router();

// user signup
router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// user login
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCred(req.body.email, req.body.password);
    const token = user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: "Invalid credentials" });
  }
});

// user profile
router.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.send("No user found");
    }
    res.send(users);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
