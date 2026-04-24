import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login } = useContext(AuthContext);
   const navigate = useNavigate();
   const [error, setError] = useState(null);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await login(email, password);
         navigate("/");
      } catch (err) {
         setError(err.response?.data?.message || "Login failed");
      }
   };

   return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
         <div className="w-full max-w-md p-8 m-4 bg-white rounded shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label
                     className="block mb-2 text-sm font-bold text-gray-700"
                     htmlFor="email"
                  >
                     Email
                  </label>
                  <input
                     className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                     id="email"
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>
               <div className="mb-6">
                  <label
                     className="block mb-2 text-sm font-bold text-gray-700"
                     htmlFor="password"
                  >
                     Password
                  </label>
                  <input
                     className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                     id="password"
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>
               <div className="flex items-center justify-between">
                  <button
                     className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                     type="submit"
                  >
                     Sign In
                  </button>
                  <Link
                     to="/register"
                     className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
                  >
                     Need an account?
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;
