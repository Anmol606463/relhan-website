import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import googleLogo from "../assets/google.png";
import facebookLogo from "../assets/facebook.png";
import linkedinLogo from "../assets/linkedin.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  // Placeholder handlers for social logins
  const handleGoogleLogin = () => {
    alert("Google login coming soon!");
  };
  const handleFacebookLogin = () => {
    alert("Facebook login coming soon!");
  };
  const handleLinkedInLogin = () => {
    alert("LinkedIn login coming soon!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-2 text-orange-600 tracking-tight">Welcome Back!</h2>
        <p className="mb-6 text-gray-500">Login to your account</p>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold shadow transition"
          >
            Login
          </button>
        </form>
        <div className="my-6 flex items-center w-full">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-4 text-gray-400 font-semibold">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-lg py-2 font-medium hover:bg-orange-50 transition"
          >
            <img src={googleLogo} alt="Google" className="w-6 h-6" />
            Login with Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-lg py-2 font-medium hover:bg-blue-50 transition"
          >
            <img src={facebookLogo} alt="Facebook" className="w-6 h-6" />
            Login with Facebook
          </button>
          <button
            onClick={handleLinkedInLogin}
            className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-lg py-2 font-medium hover:bg-blue-100 transition"
          >
            <img src={linkedinLogo} alt="LinkedIn" className="w-6 h-6" />
            Login with LinkedIn
          </button>
        </div>
        <div className="mt-6 text-gray-400 text-sm">&copy; {new Date().getFullYear()} Relhan Innovation Pvt Ltd. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Login;