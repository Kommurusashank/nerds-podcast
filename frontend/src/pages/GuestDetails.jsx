import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Globe,
  User,
} from "lucide-react";

import { getGuestById } from "../api/guests";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

function GuestDetails() {
  const { guestId } = useParams();

  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGuest = async () => {
      try {
        const data = await getGuestById(guestId);
        setGuest(data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Unable to load guest."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGuest();
  }, [guestId]);

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

  if (!guest) {
    return null;
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <Link
        to="/guests"
        className="inline-flex items-center gap-2 font-semibold text-cyan-400"
      >
        <ArrowLeft size={18} />
        Back to Guests
      </Link>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-10">
        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-800">
            {guest.profile_image_url ? (
              <img
                src={guest.profile_image_url}
                alt={guest.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User
                size={60}
                className="text-cyan-400"
              />
            )}
          </div>

          <div>
            <h1 className="text-4xl font-black">
              {guest.name}
            </h1>

            {guest.designation && (
              <p className="mt-3 text-lg text-cyan-400">
                {guest.designation}
              </p>
            )}

            {guest.company && (
              <p className="mt-2 flex items-center gap-2 text-slate-400">
                <Building2 size={17} />
                {guest.company}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              {guest.linkedin_url && (
                <a
                  href={guest.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  LinkedIn
                </a>
              )}

              {guest.twitter_url && (
                <a
                  href={guest.twitter_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Twitter
                </a>
              )}

              {guest.website_url && (
                <a
                  href={guest.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  <Globe size={18} />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {guest.short_bio && (
          <p className="mt-8 text-lg leading-8 text-slate-300">
            {guest.short_bio}
          </p>
        )}

        {guest.full_bio && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">
              About
            </h2>

            <p className="mt-4 whitespace-pre-line leading-8 text-slate-400">
              {guest.full_bio}
            </p>
          </div>
        )}

        {guest.expertise && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">
              Expertise
            </h2>

            <p className="mt-3 text-slate-300">
              {guest.expertise}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default GuestDetails;