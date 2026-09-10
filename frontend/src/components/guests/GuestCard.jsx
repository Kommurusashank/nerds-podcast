import { Link } from "react-router-dom";
import {
  Building2,
  User,
  ArrowUpRight,
} from "lucide-react";

function GuestCard({ guest }) {
  return (
    <article className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50">
      <div className="flex items-start gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-800">
          {guest.profile_image_url ? (
            <img
              src={guest.profile_image_url}
              alt={guest.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            />
          ) : (
            <User
              size={28}
              className="text-cyan-400"
            />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-xl font-black text-white">
            {guest.name}
          </h3>

          {guest.designation && (
            <p className="mt-1 text-sm font-semibold text-cyan-400">
              {guest.designation}
            </p>
          )}

          {guest.company && (
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Building2 size={15} />
              <span className="truncate">
                {guest.company}
              </span>
            </p>
          )}
        </div>
      </div>

      {guest.short_bio && (
        <p className="mt-6 line-clamp-3 text-sm leading-6 text-slate-400">
          {guest.short_bio}
        </p>
      )}

      {guest.expertise && (
        <div className="mt-5 border-t border-slate-800 pt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Expertise
          </p>

          <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
            {guest.expertise}
          </p>
        </div>
      )}

      <Link
        to={`/guests/${guest.id}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
      >
        View Profile
        <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}

export default GuestCard;