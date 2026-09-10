import { useEffect, useState } from "react";

import { getHosts } from "../api/hosts";
import HostCard from "../components/hosts/HostCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

function Hosts() {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHosts = async () => {
      try {
        const data = await getHosts();

        setHosts(
          data.filter(
            (host) =>
              host.is_active !== false
          )
        );
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Unable to load hosts."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHosts();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold text-cyan-400">
        THE TEAM
      </p>

      <h1 className="mt-2 text-4xl font-black">
        Meet Our Hosts
      </h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        The people behind the conversations at
        NerdsPodcast.
      </p>

      <div className="mt-10">
        {loading && <Loader />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading &&
          !error &&
          hosts.length === 0 && (
            <EmptyState
              title="No hosts available"
              message="Host profiles will appear here."
            />
          )}

        {!loading &&
          !error &&
          hosts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hosts.map((host) => (
                <HostCard
                  key={host.id}
                  host={host}
                />
              ))}
            </div>
          )}
      </div>
    </section>
  );
}

export default Hosts;