import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../App";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${BACKEND_URL}/auth/register`, form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0f1e] text-[#f0ece3] flex items-center justify-center px-6"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(240,236,227,0.1);
          border-radius: 4px;
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #f0ece3;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .auth-input::placeholder { color: rgba(240,236,227,0.2); }
        .auth-input:focus { border-color: rgba(232,197,71,0.4); }
      `}</style>

      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,197,71,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(232,197,71,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(232,197,71,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[440px] fade-up">

        {/* Logo */}
        <div className="text-center mb-10">
          <button
            onClick={() => navigate("/")}
            className="text-[24px] text-[#f0ece3] border-none bg-transparent cursor-pointer"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Learn<span className="text-[#e8c547]">Lite</span>
          </button>
        </div>

        {/* Card */}
        <div className="border border-white/[0.08] rounded-xl bg-white/[0.03] p-10 relative overflow-hidden">

          {/* Corner glow */}
          <div
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(232,197,71,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Heading */}
          <span
            className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Get started
          </span>
          <h1 className="text-[32px] font-normal leading-[1.15] mb-8">
            Create your <em className="text-[#e8c547] italic">account.</em>
          </h1>

          {/* Error */}
          {error && (
            <div
              className="mb-6 px-4 py-3 rounded-[4px] border border-[#f87171]/20 bg-[#f87171]/[0.05] text-[13px] font-light text-[#f87171]/80"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submitHandler} className="flex flex-col gap-5">

            {/* Name */}
            <div>
              <label
                className="text-[11px] tracking-[0.1em] uppercase text-[#f0ece3]/30 block mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="auth-input"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="text-[11px] tracking-[0.1em] uppercase text-[#f0ece3]/30 block mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="auth-input"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="text-[11px] tracking-[0.1em] uppercase text-[#f0ece3]/30 block mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="auth-input"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 bg-[#e8c547] text-[#0a0f1e] text-[14px] font-medium rounded-[4px] border-none cursor-pointer tracking-[0.02em] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(232,197,71,0.3)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="text-center text-[13px] font-light text-[#f0ece3]/30 mt-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#e8c547]/70 hover:text-[#e8c547] transition-colors duration-200 bg-transparent border-none cursor-pointer text-[13px] font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Login →
          </button>
        </p>
      </div>
    </div>
  );
}