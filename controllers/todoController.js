const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.createTodo = async (req, res) => {
  try {
       const { title, description, dueDate, dueTime, priority } = req.body;
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
    res.status(400).json({ message: "Données invalides (titre requis)" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    console.log("DONNEES RECUES :", req.body);
    const { id } = req.params;

        const allowed = ["title", "description", "completed", "dueDate", "dueTime", "priority"];
    const changes = {};
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) changes[field] = req.body[field];
    });

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      changes,
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Tache non trouvee" });
    }
    res.json({ message: "Tache mise a jour avec succes", todo });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: "Donnees invalides" });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Tache supprimee" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};