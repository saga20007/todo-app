const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date, default: null },
    dueTime: {
      type: String,
      default: "",
      match: [/^([01]\d|2[0-3]):[0-5]\d$/, "Heure invalide"],
    },
    priority: {
      type: String,
      enum: ["basse", "moyenne", "haute"],
      default: "moyenne",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);