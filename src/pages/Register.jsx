import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      localStorage.setItem("token", res.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      navigate("/tasks");
    } catch (err) {
      alert("Registration failed. Check your inputs or if email already exists.");
    }
  };

  return (
    <form onSubmit={register}>
      <h2>Register</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      <input
        name="password_confirmation"
        placeholder="Confirm Password"
        type="password"
        value={form.password_confirmation}
        onChange={handleChange}
      />
      <button type="submit">Create Account</button>
    </form>
  );
}
