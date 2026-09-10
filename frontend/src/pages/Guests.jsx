import { useEffect, useState } from "react";

import { getGuests } from "../api/guests";
import GuestCard from "../components/guests/GuestCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

function Guests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGuests = async () => {
      try {
        const data = await getGuests();
        setGuests(data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Unable to load guests."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGuests();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold text-cyan-400">
        OUR GUESTS
      </p>

      <h1 className="mt-2 text-4xl font-black">
        Meet the Experts
      </h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Discover professionals, innovators, and experts
        featured on NerdsPodcast.
      </p>

      <div className="mt-10">
        {loading && <Loader />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading &&
          !error &&
          guests.length === 0 && (
            <EmptyState
              title="No guests available"
              message="Guest profiles will appear here."
            />
          )}

        {!loading &&
          !error &&
          guests.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guests.map((guest) => (
                <GuestCard
                  key={guest.id}
                  guest={guest}
                />
              ))}
            </div>
          )}
      </div>
    </section>
  );
}

export default Guests;