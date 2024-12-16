import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const backendUrl = "https://all-mart-e-com-server.onrender.com";
const DeleteAccount = () => {
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${backendUrl}/api/v1/users/delete-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ reason, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Account deleted successfully');
      localStorage.removeItem("token");
      navigate('/');
    } else {
      alert(data.message || 'Error deleting account');
    }
  };

  return (
    <div className='min-h-screen bg-blue-100 mt-40 rounded-xl flex justify-center p-8'>
        <div className="w-full bg-blue-50 h-fit mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Delete Account</h2>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">Reason for Deleting Account:</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">Enter Your Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-6 py-2 rounded-lg w-full hover:bg-red-600"
      >
        Delete Account
      </button>
    </div>
    </div>
  );
};

export default DeleteAccount;
