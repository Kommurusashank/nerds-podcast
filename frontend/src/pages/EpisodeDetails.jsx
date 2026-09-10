import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Play,
} from "lucide-react";

import { getEpisodeById } from "../api/episodes";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

function EpisodeDetails() {
  const { episodeId } = useParams();

  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEpisode = async () => {
      try {
        const data = await getEpisodeById(
          episodeId
        );

        setEpisode(data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Unable to load episode."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEpisode();
  }, [episodeId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-14">
        <ErrorMessage message={error} />
      </section>
    );
  }

  if (!episode) {
    return null;
  }

  const durationMinutes = episode.duration_seconds
    ? Math.round(
        episode.duration_seconds / 60
      )
    : null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <Link
        to="/episodes"
        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
      >
        <ArrowLeft size={18} />
        Back to Episodes
      </Link>

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <div className="aspect-video bg-slate-800">
          {episode.thumbnail_url ? (
            <img
              src={episode.thumbnail_url}
              alt={episode.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Play
                size={72}
                className="text-cyan-400"
              />
            </div>
          )}
        </div>

        <div className="p-6 sm:p-10">
          {episode.category && (
            <p className="font-semibold text-cyan-400">
              {episode.category.name}
            </p>
          )}

          <p className="mt-4 text-sm text-slate-400">
            Episode {episode.episode_number}
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-5xl">
            {episode.title}
          </h1>

          {durationMinutes && (
            <div className="mt-5 flex items-center gap-2 text-slate-400">
              <Clock size={18} />
              {durationMinutes} minutes
            </div>
          )}

          <p className="mt-8 whitespace-pre-line text-lg leading-8 text-slate-300">
            {episode.description}
          </p>

          {episode.youtube_url && (
            <a
              href={episode.youtube_url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-400"
            >
              <Play size={18} />
              Watch on YouTube
            </a>
          )}
        </div>
      </div>

      {episode.guest && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-semibold text-cyan-400">
            FEATURED GUEST
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {episode.guest.name}
          </h2>

          <p className="mt-2 text-slate-400">
            {episode.guest.designation}
            {episode.guest.company
              ? ` · ${episode.guest.company}`
              : ""}
          </p>

          <Link
            to={`/guests/${episode.guest.id}`}
            className="mt-4 inline-block font-semibold text-cyan-400"
          >
            View Guest Profile →
          </Link>
        </div>
      )}

      {episode.hosts?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">
            Hosts
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {episode.hosts.map((host) => (
              <div
                key={host.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="font-bold">
                  {host.name}
                </h3>

                {host.bio && (
                  <p className="mt-2 text-sm text-slate-400">
                    {host.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default EpisodeDetails;