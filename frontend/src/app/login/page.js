/* export default function login() {
    return <h1>Log In</h1>;
  } */
"use client";

import { useState } from 'react';
import styles from './login.css'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-300;">
      <div class="max-w-md px-6 py-8 bg-green-50 shadow-md rounded-lg;">
        <h1 class="text-2xl mb-6 text-center font-semibold">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4;">
            <label className="block text-sm font-medium text-gray-700;">Email:</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400;"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4;">
            <label className="block text-sm font-medium text-gray-700;">Password:</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400;"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="m-10;">
            <button type="submit" className="w-full bg-blue-500 text-white rounded-lg px-3 py-2 font-semibold hover:bg-blue-600;">
              Sign In
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .container {
          margin: 50px;
        }
        p {
          color: blue;
        }
      `}</style>
    </div>
  );
}