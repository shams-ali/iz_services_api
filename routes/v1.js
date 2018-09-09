const express = require("express");

const router = express.Router();

const passport = require("passport");
const path = require("path");
const UserController = require("./../controllers/UserController");
const HomeController = require("./../controllers/HomeController");
const test = require("./testRoutes");
const invoice = require("./invoiceRoutes");
const lien = require("./lienRoutes");

require("./../middleware/passport")(passport);
/* GET home page. */
router.get("/", (req, res, next) => {
  res.json({
    status: "success",
    message: "Parcel Pending API",
    data: { version_number: "v1.0.0" }
  });
});

/* ONLY OPEN THESE FOR ADMIN
router.post("/users", UserController.create); // C

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.get
); // R
router.put(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.update
); // U
router.delete(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.remove
); // D
*/
router.post("/users/login", UserController.login);

router.get(
  "/dash",
  passport.authenticate("jwt", { session: false }),
  HomeController.Dashboard
);

// ********* API DOCUMENTATION **********
router.use(
  "/docs/api.json",
  express.static(path.join(__dirname, "/../public/v1/documentation/api.json"))
);
router.use(
  "/docs",
  express.static(path.join(__dirname, "/../public/v1/documentation/dist"))
);

router.use("/test", passport.authenticate("jwt", { session: false }), test);

router.use(
  "/invoice",
  passport.authenticate("jwt", { session: false }),
  invoice
);

router.use(
  "/lien",
  passport.authenticate("jwt", { session: false }),
  lien
);

module.exports = router;
