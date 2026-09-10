import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, LogIn } from "lucide-react";

import { login } from "../api/auth";
import ErrorMessage from "../components/common/ErrorMessage";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await login({
        email,
        password,
      });

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
            <LockKeyhole
              size={28}
              className="text-cyan-400"
            />
          </div>

          <h1 className="mt-5 text-3xl font-black text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage the Nerds Podcast platform.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          {error && (
            <ErrorMessage message={error} />
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-300"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="admin@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn size={19} />

            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;