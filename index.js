const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Configuration de l'envoi d'emails (Brevo, ex-Sendinblue).
// Les identifiants viennent du fichier .env : jamais écrits dans le code.
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecte"))
  .catch((err) => console.error("Erreur MongoDB :", err));

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Serveur demarre sur le port", PORT));

module.exports = { transporter };