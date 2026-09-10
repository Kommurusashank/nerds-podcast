import { Link } from "react-router-dom";
import {
  Clock,
  Play,
  ArrowUpRight,
} from "lucide-react";

function EpisodeCard({ episode }) {
  const durationMinutes = episode.duration_seconds
    ? Math.round(
        episode.duration_seconds / 60
      )
    : null;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-cyan-400/5">
      <div className="relative aspect-video overflow-hidden bg-slate-800">
        {episode.thumbnail_url ? (
          <img
            src={episode.thumbnail_url}
            alt={episode.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-400/15 via-slate-900 to-slate-950">
            <div className="absolute h-32 w-32 rounded-full border border-cyan-400/20" />

            <div className="absolute h-48 w-48 rounded-full border border-cyan-400/10" />

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30 transition group-hover:scale-110">
              <Play
                size={28}
                fill="currentColor"
              />
            </div>
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full border border-cyan-400/20 bg-slate-950/90 px-3 py-1.5 text-xs font-bold text-cyan-400 backdrop-blur">
          EPISODE {episode.episode_number}
        </div>

        {episode.youtube_url && (
          <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
            <Play size={18} />
          </div>
        )}
      </div>

      <div className="p-6">
        {episode.category && (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
            {episode.category.name}
          </p>
        )}

        <h3 className="mt-3 line-clamp-2 text-xl font-black leading-snug text-white">
          {episode.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {episode.description}
        </p>

        {episode.guest && (
          <div className="mt-5 border-t border-slate-800 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Featuring
            </p>

            <p className="mt-1 font-semibold text-slate-200">
              {episode.guest.name}
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          {durationMinutes ? (
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <Clock size={16} />
              {durationMinutes} min
            </span>
          ) : (
            <span />
          )}

          <Link
            to={`/episodes/${episode.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
          >
            Explore
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EpisodeCard;