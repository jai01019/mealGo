// src/components/ForgetPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Shield, Key } from "lucide-react";

const ForgetPassword = () => {
  const [step, setStep] = useState(1); // Start at step 1
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // ✅ Correct endpoint: /send-otp (matches your backend)
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/send-otp`,
        { email }
      );
      setMessage(response.data.message || "OTP sent to your email!");
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP with backend
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // ✅ Call backend to verify OTP
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/verify-otp`,
        { email, otp }
      );
      setMessage(response.data.message || "OTP verified successfully!");
      setStep(3); // Only proceed if backend confirms
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Invalid or expired OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/reset-password`,
        { email, otp, password:newPassword }
      );
      setMessage(response.data.message || "Password reset successful!");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-700">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-cyan-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {step === 1
              ? "Reset Your Password"
              : step === 2
              ? "Enter Verification Code"
              : "Create New Password"}
          </h2>
          <p className="text-slate-400 mt-2">
            {step === 1
              ? "Enter your email to receive a 6-digit OTP"
              : step === 2
              ? "Check your inbox and enter the OTP"
              : "Enter a strong new password"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 bg-green-900/30 border border-green-700 text-green-300 rounded-lg text-sm">
            {message}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your email address"
                className="w-full pl-10 bg-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold ${
                loading
                  ? "bg-cyan-700 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-400 text-slate-900"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                inputMode="numeric"
                required
                className="w-full bg-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-center text-lg tracking-widest"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold ${
                loading
                  ? "bg-cyan-700 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-400 text-slate-900"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="relative">
              <Key className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                required
                className="w-full pl-10 bg-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full pl-10 bg-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold ${
                loading
                  ? "bg-cyan-700 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-400 text-slate-900"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <button
          onClick={() => {
            if (step > 1) {
              setStep(step - 1);
              setError("");
              setMessage("");
            } else {
              navigate("/signin");
            }
          }}
          className="w-full mt-6 text-cyan-400 text-sm hover:underline flex items-center justify-center gap-1"
        >
          ← {step === 1 ? "Back to Sign In" : "Go Back"}
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;