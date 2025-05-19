const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/test", (req, res) => {
  res.send("test successful!");
});

app.get("/reqcount", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`You sent a request ${req.session.count} times`);
});

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  //   console.log(req.session.name);
  //   res.send(name);
  if (name === "anonymous") {
    req.flash("error", "user not registered");
  } else {
    req.flash("success", "user registered successfully!");
  }
  res.redirect("/hello");
});

// app.get("/hello", (req, res) => {
//   //   res.send(`hello, ${req.session.name}`);
//   res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
// });

app.get("/hello", (req, res) => {
  //   res.locals.successMsg = req.flash("success");
  //   res.locals.errorMsg = req.flash("error");
  res.render("page.ejs", { name: req.session.name });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
