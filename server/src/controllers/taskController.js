const { Task } = require("../models");

// Get all tasks for logged in user
exports.getTasks = async (req, res) => {
   try {
      const tasks = await Task.findAll({
         where: { userId: req.user.id },
         order: [["createdAt", "DESC"]],
      });
      res.json(tasks);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
   }
};

// Create a task
exports.createTask = async (req, res) => {
   try {
      const { title, description } = req.body;

      if (!title) {
         return res.status(400).json({ message: "Title is required" });
      }

      const task = await Task.create({
         title,
         description,
         userId: req.user.id,
      });

      res.status(201).json(task);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
   }
};

// Update task status
exports.updateTask = async (req, res) => {
   try {
      const { id } = req.params;
      const { status, title, description } = req.body;

      let task = await Task.findOne({ where: { id, userId: req.user.id } });

      if (!task) {
         return res.status(404).json({ message: "Task not found" });
      }

      if (status) task.status = status;
      if (title) task.title = title;
      if (description !== undefined) task.description = description;

      await task.save();

      res.json(task);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
   }
};

// Delete a task
exports.deleteTask = async (req, res) => {
   try {
      const { id } = req.params;

      const task = await Task.findOne({ where: { id, userId: req.user.id } });

      if (!task) {
         return res.status(404).json({ message: "Task not found" });
      }

      await task.destroy();

      res.json({ message: "Task removed" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
   }
};
