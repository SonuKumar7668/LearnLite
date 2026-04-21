import { useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { label: "Features", path: "/features" },
    { label: "Chat", path: "/chat" },
    { label: "Quiz", path: "/quiz" },
    { label: "Notes", path: "/notes" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]"
      style={{
        background: "rgba(10,15,30,0.85)",
        backdropFilter: "blur(12px)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <div className="max-w-[1100px] mx-auto px-8 md:px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-[20px] text-[#f0ece3] border-none bg-transparent cursor-pointer"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Learn<span className="text-[#e8c547]">Lite</span>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="text-[13px] font-light border-none bg-transparent cursor-pointer transition-colors duration-200"
                style={{
                  color: active ? "#e8c547" : "rgba(240,236,227,0.45)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Auth area */}
        <div className="flex items-center gap-3">
          {userInfo ? (
            <>
              {/* User badge */}
              <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-[4px] border border-white/[0.08] bg-white/[0.03]">
                <div className="w-5 h-5 rounded-[3px] bg-[#e8c547]/[0.12] border border-[#e8c547]/20 flex items-center justify-center text-[10px] text-[#e8c547] font-medium">
                  {userInfo.name?.charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-[13px] font-light text-[#f0ece3]/50 max-w-[120px] truncate"
                >
                  {userInfo.name}
                </span>
              </div>

              {/* Profile */}
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 text-[13px] font-light text-[#f0ece3]/50 rounded-[4px] border border-white/[0.08] bg-transparent cursor-pointer hover:border-white/20 hover:text-[#f0ece3]/80 transition-all duration-200"
              >
                Profile
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-[13px] font-light text-[#f87171]/60 rounded-[4px] border border-[#f87171]/15 bg-transparent cursor-pointer hover:border-[#f87171]/35 hover:text-[#f87171] transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-[13px] font-light text-[#f0ece3]/50 rounded-[4px] border border-white/[0.08] bg-transparent cursor-pointer hover:border-white/20 hover:text-[#f0ece3]/80 transition-all duration-200"
              >
                Login
              </button>

              {/* Sign up */}
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 text-[13px] font-medium text-[#0a0f1e] bg-[#e8c547] rounded-[4px] border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,197,71,0.3)] transition-all duration-200"
              >
                Sign up →
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}