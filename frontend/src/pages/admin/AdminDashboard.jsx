import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Folder,
  Mic,
  Users,
  UserRound,
  MessageSquare,
  PlayCircle,
} from "lucide-react";

import { getCategories } from "../../api/categories";
import { getEpisodes } from "../../api/episodes";
import { getGuests } from "../../api/guests";
import { getHosts } from "../../api/hosts";
import { getQuestions } from "../../api/questions";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    episodes: 0,
    guests: 0,
    hosts: 0,
    questions: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          categories,
          episodes,
          guests,
          hosts,
          questions,
        ] = await Promise.all([
          getCategories(),
          getEpisodes(),
          getGuests(),
          getHosts(),
          getQuestions(),
        ]);

        setStats({
          categories: categories.length,
          episodes: episodes.length,
          guests: guests.length,
          hosts: hosts.length,
          questions: questions.length,
        });
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className="p-6">
        <ErrorMessage message={error} />
      </section>
    );
  }

  const dashboardCards = [
    {
      title: "Episodes",
      value: stats.episodes,
      icon: PlayCircle,
      path: "/admin/episodes",
      description: "Manage podcast episodes",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: Folder,
      path: "/admin/categories",
      description: "Manage episode categories",
    },
    {
      title: "Guests",
      value: stats.guests,
      icon: Users,
      path: "/admin/guests",
      description: "Manage podcast guests",
    },
    {
      title: "Hosts",
      value: stats.hosts,
      icon: UserRound,
      path: "/admin/hosts",
      description: "Manage podcast hosts",
    },
    {
      title: "Questions",
      value: stats.questions,
      icon: MessageSquare,
      path: "/admin/questions",
      description: "Review audience questions",
    },
  ];

  return (
    <section className="p-6 sm:p-8">
      <div>
        <h1 className="text-3xl font-black text-white">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your Nerds Podcast platform from one place.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              to={card.path}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Icon size={24} />
                </div>

                <span className="text-4xl font-black text-white">
                  {card.value}
                </span>
              </div>

              <h2 className="mt-6 text-xl font-bold text-white">
                {card.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3">
          <Mic
            size={24}
            className="text-cyan-400"
          />

          <div>
            <h2 className="text-xl font-bold text-white">
              Podcast Management
            </h2>

            <p className="mt-1 text-slate-400">
              Use the management sections to create, update, and organize
              podcast content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;