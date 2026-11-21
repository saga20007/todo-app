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
    const { title } = req.body;
    const todo = new Todo({ title, userId: req.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: "Titre requis" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Tache non trouvee" });
    }
    res.json({ message: "Tache mise a jour avec succes", todo });
  } catch (error) {
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