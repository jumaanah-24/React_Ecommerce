import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:2000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Registration successful 🎉");
      navigate("/login");
    } catch (err) {
      toast.error("Unable to connect to server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={submit}
        className="w-[340px] bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

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

        <button className="w-full py-2 bg-blue-600 text-white rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
