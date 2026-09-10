import { useEffect, useState } from "react";

import { getEpisodes } from "../api/episodes";
import EpisodeGrid from "../components/episodes/EpisodeGrid";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const data = await getEpisodes();
        setEpisodes(data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Unable to load episodes."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, []);

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      episode.category?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      episode.guest?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-cyan-400">
          PODCAST LIBRARY
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Explore Episodes
        </h1>

        <p className="mt-4 text-slate-400">
          Discover conversations about technology,
          innovation, and emerging ideas.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search episodes, guests or categories..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        className="mt-8 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-cyan-400"
      />

      <div className="mt-8">
        {loading && <Loader />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading &&
          !error &&
          filteredEpisodes.length === 0 && (
            <EmptyState
              title="No episodes found"
              message="Try a different search term."
            />
          )}

        {!loading &&
          !error &&
          filteredEpisodes.length > 0 && (
            <EpisodeGrid
              episodes={filteredEpisodes}
            />
          )}
      </div>
    </section>
  );
}

export default Episodes;