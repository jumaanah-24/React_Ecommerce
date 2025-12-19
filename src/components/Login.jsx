import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {toast} from "react-toastify";
import { Link } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:2000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // Save auth info
      login(data.token, { username, role });

      toast.success("Login successful 🎉");

      // Role based navigation
      if (role === "admin") {
        navigate("/add-product");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error("Server not reachable");
    }
  };

  return (
    <>
   <div
  className="mt-50  flex items-center justify-center"
>   <form
        onSubmit={submit}
        className="w-100 h-70 bg-blue-200 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      <Link to="/products">
        <button className="w-full py-2 bg-blue-600 text-white rounded mt-5">
          Log In
        </button>
        </Link>
      </form>
    </div>
    </>
  );
};


export default Login;
