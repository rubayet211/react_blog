import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";


interface RegisterInputs {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [inputs, setInputs] = useState<RegisterInputs>({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      const error = (err as AxiosError).response?.data;
      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('An error occurred');
      }
    }
  };
  

  return (
    <div className="auth flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-2xl font-bold text-white mb-4">Register</h1>
      <form className="flex flex-col items-center space-y-2">
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          className="w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          className="w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          className="w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSubmit} className="w-64 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:shadow-xl">Register</button>
        {err && <p className="text-red-500">{err}</p>}
        <span className="text-white">
          Do you have an account? <Link className="text-pink-400 hover:text-purple-600" to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
