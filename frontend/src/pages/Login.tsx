import { AxiosError } from 'axios';
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

interface LoginInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [inputs, setInputs] = useState<LoginInputs>({
    username: "",
    password: "",
  });
  const [err, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

if (!authContext) {
  throw new Error("AuthContext is undefined, make sure you're using the AuthContexProvider");
}

const { login } = authContext;

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
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
      <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
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
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          className="w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSubmit} className="w-64 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:shadow-xl">Login</button>
        {err && <p className="text-red-500">{err}</p>}
        <span className="text-white">
          Don't you have an account? <Link className="text-pink-400 hover:text-purple-600" to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
