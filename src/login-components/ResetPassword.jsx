import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const backendUrl = "https://all-mart-e-com-server.onrender.com";
export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/v1/users/reset-password/${token}`, { password });
      setMessage(response.data.message);
      setError('');
      setTimeout(() => navigate('/login'), 3000); // Navigate to login after success
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-4xl text-[#b70c0c] font-bold mb-16">Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">New Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-full bg-[#fbc7c7]/50 mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-1/2 bg-[#b70c0c] text-white py-2 rounded-full hover:bg-[#920a0a]"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
