import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/signup', { email, password });
      setIsOtpSent(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error during signup');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/users/verify-otp', { email, otp });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error during OTP verification');
    }
  };

  return (
    <div className="">
        <p className="text-gray-700 text-base mb-2">Welcome To Allmart!!!</p>
      <h2 className="text-4xl text-[#b70c0c] font-bold mb-16">Sign Up</h2>
      <form onSubmit={isOtpSent ? handleVerifyOtp : handleSignup}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
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
          <label htmlFor="password" className="block text-sm font-semibold">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-full bg-[#fbc7c7]/50 mt-1"
            required
          />
        </div>
        
        {isOtpSent ? (
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-semibold">Enter OTP</label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 rounded-full bg-[#fbc7c7]/50 mt-1"
              required
            />
          </div>
        ) : null}
        
        <button
          type="submit"
          className="w-1/3 bg-[#b70c0c] text-white py-2 rounded-full hover:bg-[#920a0a]"
        >
          {isOtpSent ? 'Verify OTP' : 'Sign Up'}
        </button>
      </form>
      
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      
      <p className="mt-4 text-center text-gray-500">
        Already have an account? <a href="/login" className="text-[#b70c0c]">Login here</a>
      </p>
    </div>
  );
}
