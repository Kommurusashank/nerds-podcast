import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Mic2,
  Users,
  UserRound,
  FolderOpen,
  MessageSquare,
  LogOut,
  Podcast,
} from "lucide-react";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_token");

    navigate("/admin/login", {
      replace: true,
    });
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Episodes",
      path: "/admin/episodes",
      icon: Podcast,
    },
    {
      name: "Guests",
      path: "/admin/guests",
      icon: Users,
    },
    {
      name: "Hosts",
      path: "/admin/hosts",
      icon: UserRound,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: FolderOpen,
    },
    {
      name: "Questions",
      path: "/admin/questions",
      icon: MessageSquare,
    },
  ];

  return (
    <aside className="flex min-h-screen w-full flex-col border-r border-slate-800 bg-slate-950 md:w-64">
      <div className="border-b border-slate-800 px-6 py-6">
        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
            <Mic2 size={22} />
          </div>

          <div>
            <h1 className="text-lg font-black text-white">
              Nerds Podcast
            </h1>

            <p className="text-xs text-slate-400">
              Admin Panel
            </p>
          </div>
        </NavLink>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white",
                ].join(" ")
              }
            >
              <Icon size={19} />

              <span>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={19} />

          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;