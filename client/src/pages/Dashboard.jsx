import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CheckCircle, Circle, Trash2, LogOut } from "lucide-react";

const Dashboard = () => {
   const { user, logout } = useContext(AuthContext);
   const [tasks, setTasks] = useState([]);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");

   useEffect(() => {
      fetchTasks();
   }, []);

   const fetchTasks = async () => {
      try {
         const { data } = await axios.get("/tasks");
         setTasks(data);
      } catch (error) {
         console.error("Failed to fetch tasks", error);
      }
   };

   const handleCreateTask = async (e) => {
      e.preventDefault();
      if (!title.trim()) return;
      try {
         const { data } = await axios.post("/tasks", { title, description });
         setTasks([data, ...tasks]);
         setTitle("");
         setDescription("");
      } catch (error) {
         console.error("Failed to create task", error);
      }
   };

   const toggleTaskStatus = async (id, currentStatus) => {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      try {
         const { data } = await axios.put(`/tasks/${id}`, {
            status: newStatus,
         });
         setTasks(tasks.map((task) => (task.id === id ? data : task)));
      } catch (error) {
         console.error("Failed to update task", error);
      }
   };

   const handleDeleteTask = async (id) => {
      try {
         await axios.delete(`/tasks/${id}`);
         setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
         console.error("Failed to delete task", error);
      }
   };

   return (
      <div className="min-h-screen bg-gray-50">
         <nav className="bg-white shadow">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
               <div className="flex justify-between h-16">
                  <div className="flex items-center">
                     <h1 className="text-xl font-bold text-gray-800">
                        Task Manager
                     </h1>
                  </div>
                  <div className="flex items-center">
                     <span className="mr-4 text-gray-600 truncate">
                        {user?.email}
                     </span>
                     <button
                        onClick={logout}
                        className="p-2 text-gray-500 hover:text-red-500"
                     >
                        <LogOut size={20} />
                     </button>
                  </div>
               </div>
            </div>
         </nav>

         <main className="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Create Task Form */}
            <div className="bg-white rounded-lg shadow sm:p-6 p-4 mb-8">
               <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Create New Task
               </h2>
               <form onSubmit={handleCreateTask} className="space-y-4">
                  <div>
                     <input
                        type="text"
                        placeholder="Task Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                     />
                  </div>
                  <div>
                     <textarea
                        placeholder="Description (Optional)"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                     />
                  </div>
                  <button
                     type="submit"
                     className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                     Add Task
                  </button>
               </form>
            </div>

            {/* Task List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
               <ul className="divide-y divide-gray-200">
                  {tasks.length === 0 ? (
                     <li className="px-4 py-8 text-center text-gray-500">
                        No tasks found. Create one above!
                     </li>
                  ) : (
                     tasks.map((task) => (
                        <li
                           key={task.id}
                           className={`px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center justify-between ${task.status === "completed" ? "bg-gray-50 opacity-75" : ""}`}
                        >
                           <div className="flex items-center flex-1">
                              <button
                                 onClick={() =>
                                    toggleTaskStatus(task.id, task.status)
                                 }
                                 className="mr-4 text-blue-500 hover:text-blue-700"
                              >
                                 {task.status === "completed" ? (
                                    <CheckCircle className="text-green-500" />
                                 ) : (
                                    <Circle />
                                 )}
                              </button>
                              <div>
                                 <h3
                                    className={`text-sm font-medium ${task.status === "completed" ? "text-gray-500 line-through" : "text-gray-900"}`}
                                 >
                                    {task.title}
                                 </h3>
                                 {task.description && (
                                    <p
                                       className={`mt-1 text-sm ${task.status === "completed" ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                       {task.description}
                                    </p>
                                 )}
                              </div>
                           </div>
                           <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="ml-4 text-red-400 hover:text-red-600"
                           >
                              <Trash2 size={20} />
                           </button>
                        </li>
                     ))
                  )}
               </ul>
            </div>
         </main>
      </div>
   );
};

export default Dashboard;
