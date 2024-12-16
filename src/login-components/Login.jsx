import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = "https://all-mart-e-com-server.onrender.com";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/users/login`,
        { email, password }
      );
      localStorage.setItem("token", response.data.token); // Save JWT token in localStorage
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="">
            <p className="text-gray-700 text-base mb-2">Welcome Back!!!</p>
            <h2 className="text-4xl text-[#b70c0c] font-bold mb-16">LOGIN</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-full bg-[#fbc7c7]/50 mt-1"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded-full bg-[#fbc7c7]/50 mt-1"
                  required
                />
              </div>
              <p className="mb-4 text-end">
                <a href="/forgot-password" className="text-gray-500">
                  Forgot Password?
                </a>
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/3 bg-[#b70c0c] text-white py-2 rounded-full hover:bg-[#920a0a]"
                >
                  Login
                </button>
              </div>
            </form>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <p className="mt-4 text-center text-gray-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#b70c0c]">
                Sign up here
              </a>
            </p>
    </div>
  );
}
