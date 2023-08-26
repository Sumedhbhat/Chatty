const jwt = require("jsonwebtoken");

const generateWebToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = generateWebToken;
