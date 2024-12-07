// routes/todo.js:

const router = require("express").Router();
const Todo = require("../models/Todo");

// Add new todo
router.post("/add", (req, res) => {
  const { todo } = req.body;
  const newTodo = new Todo({ todo });

  // Save the todo
  newTodo
    .save()
    .then(() => {
      console.log("Successfully added todo!");
      res.status(201).json({ message: "Todo added successfully", todo: newTodo });
    })
    .catch((err) => {
      console.error("Error adding todo:", err);
      res.status(500).json({ error: "Failed to add todo" });
    });
});

// Update todo
router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  Todo.findByIdAndUpdate(id, { todo }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      console.log("Successfully updated todo!");
      res.json({ message: "Todo updated successfully", todo: updatedTodo });
    })
    .catch((err) => {
      console.error("Error updating todo:", err);
      res.status(500).json({ error: "Failed to update todo" });
    });
});

// Delete todo
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndDelete(id)
    .then((deletedTodo) => {
      if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      console.log("Deleted Todo Successfully!");
      res.json({ message: "Todo deleted successfully", todo: deletedTodo });
    })
    .catch((err) => {
      console.error("Error deleting todo:", err);
      res.status(500).json({ error: "Failed to delete todo" });
    });
});

module.exports = router;
