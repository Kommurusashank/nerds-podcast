import { User } from "lucide-react";

function HostCard({ host }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:border-cyan-400/50">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-800">
        {host.profile_image_url ? (
          <img
            src={host.profile_image_url}
            alt={host.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <User
            size={42}
            className="text-cyan-400"
          />
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold">
        {host.name}
      </h3>

      {host.bio && (
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {host.bio}
        </p>
      )}
    </article>
  );
}

export default HostCard;