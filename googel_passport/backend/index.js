import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import cors from "cors"
import passport from "./passport/index.js";


import mongoose from "mongoose";
// If using MongoDB

const PORT = process.env.PORT || 8000;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/google-passport-test")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

  app.use(cors())

// Session middleware (essential for Passport)
// app.use(
//   session({
//     secret: "your_secret_key", // Replace with a strong secret
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// app.use(passport.session());

const handleSocialLogin = 
  async (req, res) => {
    console.log("handle social login run");
    console.log("user: ", req.user);

    res.redirect(`${process.env.CLIENT_SSO_REDIRECT_URL}`);
  };




// Passport Google Strategy


// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
); // Request user profile and email

app.get(
  "/api/v1/user/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }), // Redirect to /login on failure
  handleSocialLogin
);



// Example protected route
app.get("/dashboard", isLoggedIn, (req, res) => {
  res.send(`Welcome, ${req.user.displayName}!`);
});

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is logged in, proceed to the next middleware/route handler
  }
  res.redirect("/login"); // Redirect to login if not authenticated
}

// Your other routes (e.g., login page, etc.)
app.get("/login", (req, res) => {
  res.send('<h1>Login Page</h1><a href="/auth/google">Login with Google</a>');
});

app.use("/api/user/dashboard", (req, res) => {
  res.json({ message: "dashboard access granted" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
