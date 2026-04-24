require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/database");
require("./models"); // Import models so Sequelize knows about them
// Import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
   try {
      await connectDB();
      // Sync database
      await sequelize.sync({ alter: true }); // Use alter: true to update schema without dropping data
      console.log("Database synced");

      app.listen(PORT, () => {
         console.log(`Server running on port ${PORT}`);
      });
   } catch (error) {
      console.error("Failed to start server:", error);
   }
};

startServer();
