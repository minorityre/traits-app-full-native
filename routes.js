const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

/*app.use(
  cors({
    origin: ["http://localhost:19006/"],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
*/

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:19006");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-access-Token"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "tk",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "traitapp",
});

// REGISTRO
app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "SELECT name, email FROM users WHERE name = ? OR email = ?",
      [username, email],
      (err, result) => {
        console.log(result);
        if (result.length > 0) {
          if (result[0].name == username || result[0].email == email) {
            console.log("ha trobat username / email");
            console.log(result);
            res.json({
              auth: false,
              message: "El usuario o email ya está registrado",
            });
          }
        } else {
          console.log(result);
          db.query(
            "INSERT INTO users (name, email, password, testDone, matchesAvailable, profileImg, description) VALUES (?,?,?,0,0,'base.jpg','Edita tu descripción')",
            [username, email, hash],
            (err, result) => {
              console.log(result);
              console.log(err);
              const id = Math.floor(Math.random() * 100) + 1;
              console.log(id);
              const token = jwt.sign({ id }, "jwtSecret", {
                expiresIn: 300,
              });
              req.session.user = result;
              res.json({
                token: token,
                auth: true,
                message: "Creando cuenta",
              });
            }
          );
        }
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user[0].name });
  } else {
    res.send({ loggedIn: false });
  }
});

// LOGIN
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE name = ?", username, (err, result) => {
    if (err) {
      res.send({ err: err });
      console.log(err);
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        console.log(result[0].password);
        if (response) {
          const id = result[0].id;
          console.log(id);
          const token = jwt.sign({ id }, "jwtSecret", {
            expiresIn: 300,
          });
          req.session.user = result;

          res.json({ auth: true, token: token, result: result });
        } else {
          res.json({ auth: false, message: "Usuario o contraseña erroneo" });
        }
      });
    } else {
      res.json({ auth: false, message: "El usuario no existe" });
    }
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("No token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to authenticate." });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Authenticated.");
});

// GET ALL USERS
app.get("/users", function (req, res) {
  db.getConnection(function (err, db) {
    db.query("SELECT * FROM users", function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  });
});

// Get user Matches
app.post("/getMatchesByUser", (req, res) => {
  const userId = req.body.userId;
  db.query(
    "SELECT o.matchesId, s.name, s.email, s.profileImg, s.description FROM users AS u INNER JOIN matches AS o ON u.id = ? INNER JOIN users AS s ON o.matchesId = s.id",
    userId,
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log(err);
      }
      if (result.length > 0) {
        res.json({ result: result });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("RUNNING OK");
});
