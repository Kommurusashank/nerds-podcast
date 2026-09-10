import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  Mic2,
  X,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Episodes", path: "/episodes" },
    { name: "Guests", path: "/guests" },
    { name: "Hosts", path: "/hosts" },
    { name: "Categories", path: "/categories" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20 transition duration-300 group-hover:scale-105">
            <Mic2 size={22} />
          </div>

          <div>
            <span className="block text-lg font-black tracking-tight text-white">
              Nerds
              <span className="text-cyan-400">
                Podcast
              </span>
            </span>

            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:block">
              Ideas. People. Future.
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/ask-question"
            className="ml-3 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
          >
            <Sparkles size={16} />
            Ask a Question
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-white transition hover:border-cyan-400/50 lg:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950/98 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 font-semibold transition ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-400"
                      : "text-slate-300 hover:bg-slate-900"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/ask-question"
              onClick={closeMenu}
              className="mt-3 rounded-xl bg-cyan-400 px-4 py-3 text-center font-bold text-slate-950"
            >
              Ask a Question
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;