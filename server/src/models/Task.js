const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Task = sequelize.define(
   "Task",
   {
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      userId: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      status: {
         type: DataTypes.ENUM("pending", "completed"),
         defaultValue: "pending",
      },
   },
   {
      timestamps: true,
   },
);

module.exports = Task;
