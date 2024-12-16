import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/forgot-password', { email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending reset email');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}