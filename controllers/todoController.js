const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    console.error("Erreur getTodos :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, dueTime, priority } = req.body || {};
    const todo = new Todo({
      title,
      description,
      dueDate,
      dueTime,
      priority,
      userId: req.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error("Erreur createTodo :", err);
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ message: "Données invalides : " + err.message });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const allowed = ["title", "description", "completed", "dueDate", "dueTime", "priority"];
    const changes = {};
    allowed.forEach((field) => {
      if (body[field] !== undefined) changes[field] = body[field];
    });

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      changes,
      { returnDocument: "after", runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Tache non trouvee" });
    }
    res.json({ message: "Tache mise a jour avec succes", todo });
  } catch (err) {
    console.error("Erreur updateTodo :", err);
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ message: "Données invalides : " + err.message });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Tache supprimee" });
  } catch (err) {
    console.error("Erreur deleteTodo :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};