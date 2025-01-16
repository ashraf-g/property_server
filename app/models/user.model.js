const sql = require("../configs/dbConnect");
const bcrypt = require("bcryptjs");

// Table constructor
const User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
};

User.signup = function (newUser, result) {
  bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
    if (err) {
      return result(err, null);
    }
    newUser.password = hashedPassword;
    const query =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    sql.query(
      query,
      [newUser.username, newUser.email, newUser.password, newUser.role],
      (err, res) => {
        if (err) {
          return result(err, null);
        }
        result(null, res);
      }
    );
  });
};

User.login = function (email, password, result) {
  const query = "SELECT * FROM users WHERE email = ?";
  sql.query(query, [email], (err, res) => {
    if (err) {
      return result(err, null);
    }
    if (res.length === 0) {
      return result({ message: "User not found" }, null);
    }

    // Compare password with hashed password
    bcrypt.compare(password, res[0].password, (err, isMatch) => {
      if (err || !isMatch) {
        return result({ message: "Invalid password" }, null);
      }
      result(null, res[0]);
    });
  });
};

module.exports = User;
