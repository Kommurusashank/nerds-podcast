import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Mic2,
  Search,
  Headphones,
  Sparkles,
  MessageCircle,
  Mail,
  X,
  Brain,
  Laptop,
  Rocket,
  Palette,
  FlaskConical,
  ChevronRight,
} from "lucide-react";

import { getEpisodes } from "../api/episodes";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

function Home() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showWelcome, setShowWelcome] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        setLoading(true);

        const data = await getEpisodes();

        setEpisodes(data || []);
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

    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const formatDuration = (seconds) => {
    if (!seconds) {
      return "";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const getThumbnail = (episode, index) => {
    if (episode.thumbnail_url) {
      return episode.thumbnail_url;
    }

    const fallbackImages = [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=1000&q=80",
    ];

    return fallbackImages[index % fallbackImages.length];
  };

  const featuredEpisodes = episodes.slice(0, 4);

  const categories = [
    {
      name: "Artificial Intelligence",
      episodes: "Explore AI",
      icon: Brain,
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Technology",
      episodes: "Latest trends",
      icon: Laptop,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Startups",
      episodes: "Ideas & founders",
      icon: Rocket,
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Creative Economy",
      episodes: "Creators & ideas",
      icon: Palette,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Science & Research",
      episodes: "Discover more",
      icon: FlaskConical,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    alert("Thank you for subscribing to NerdsPodcast!");

    setEmail("");
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}

      <section className="relative min-h-[680px] overflow-hidden border-b border-slate-800 bg-slate-950">
        {/* BACKGROUND VIDEO */}

        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-45"
          >
            <source
              src="/videos/podcast-animation.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        </div>

        {/* HERO CONTENT */}

        <div className="relative z-10 mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          {/* LEFT */}

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold tracking-widest text-cyan-400">
              <Sparkles size={15} />
              IDEAS. PEOPLE. FUTURE.
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Conversations
              <br />
              that
              <span className="text-cyan-400">
                {" "}
                inspire
              </span>
              <br />
              change.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Real people. Real stories. Real impact.
              <br />
              A podcast for curious minds exploring technology,
              innovation, artificial intelligence and the future.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/episodes"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-[1.03] hover:bg-cyan-300"
              >
                Explore Episodes
                <ArrowRight size={18} />
              </Link>

              <a
                href="#featured"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-950/40 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-cyan-400"
              >
                <Play size={17} />
                Watch Trailer
              </a>
            </div>
          </div>

          {/* RIGHT HERO CARD */}

          <div className="relative hidden min-h-[450px] lg:block">
            {/* Decorative circles */}

            <div className="absolute right-12 top-12 h-80 w-80 rounded-full border border-cyan-400/20" />

            <div className="absolute right-24 top-24 h-56 w-56 rounded-full border border-cyan-400/30" />

            {/* Latest Episode Card */}

            <div className="absolute bottom-10 right-0 w-[360px] rounded-2xl border border-cyan-400/40 bg-slate-950/80 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Latest Episode
                </span>

                <Mic2
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                {episodes[0]?.title ||
                  "The Future of AI and Humanity"}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {episodes[0]?.guest?.name ||
                  "NerdsPodcast Guest"}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                  <Play
                    size={18}
                    fill="currentColor"
                  />
                </div>

                <div className="h-1 flex-1 rounded-full bg-slate-700">
                  <div className="h-full w-2/3 rounded-full bg-cyan-400" />
                </div>

                <span className="text-xs text-slate-400">
                  Play
                </span>
              </div>
            </div>

            {/* Floating icon */}

            <div className="absolute left-6 top-28 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-slate-950/70 text-cyan-400 shadow-xl backdrop-blur">
              <Headphones size={28} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}

        <a
          href="#featured"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center text-xs font-semibold tracking-widest text-slate-400 lg:flex"
        >
          SCROLL
          <ChevronRight className="mt-1 rotate-90" size={18} />
        </a>
      </section>

      {/* ================= PODCAST DISTRIBUTION SECTION ================= */}

      <section className="overflow-hidden border-b border-slate-800 bg-[#06101a]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
          {/* Visual */}

          <div className="relative min-h-[480px]">
            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />

            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30" />

            <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-slate-800 shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source
                  src="/videos/podcast-animation.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            {/* Platform Icons */}

            <div className="absolute left-8 top-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-xl font-black shadow-xl">
              ▶
            </div>

            <div className="absolute right-10 top-12 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-black shadow-xl">
              f
            </div>

            <div className="absolute bottom-24 left-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 text-2xl shadow-xl">
              🎙
            </div>

            <div className="absolute bottom-12 right-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-xl font-bold shadow-xl">
              ♫
            </div>
          </div>

          {/* Content */}

          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              BE HEARD EVERYWHERE
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Your ideas deserve
              <br />
              a bigger
              <span className="text-cyan-400">
                {" "}
                audience.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Discover conversations, explore emerging ideas,
              and connect with people shaping the future.
              NerdsPodcast brings meaningful technology and
              innovation discussions together in one place.
            </p>

            <Link
              to="/episodes"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Start Exploring
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED EPISODES ================= */}

      <section
        id="featured"
        className="border-b border-slate-800 bg-slate-950"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
                FEATURED EPISODES
              </p>

              <h2 className="mt-3 text-4xl font-black">
                Latest Conversations
              </h2>

              <p className="mt-3 text-slate-400">
                Tune into powerful ideas, stories and
                thought-provoking discussions.
              </p>
            </div>

            <Link
              to="/episodes"
              className="inline-flex items-center gap-2 font-bold text-cyan-400 transition hover:text-cyan-300"
            >
              View All Episodes
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10">
            {loading && <Loader />}

            {!loading && error && (
              <ErrorMessage message={error} />
            )}

            {!loading &&
              !error &&
              featuredEpisodes.length === 0 && (
                <EmptyState
                  title="No episodes yet"
                  message="Episodes will appear here once they are added."
                />
              )}

            {!loading &&
              !error &&
              featuredEpisodes.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {featuredEpisodes.map(
                    (episode, index) => (
                      <article
                        key={episode.id}
                        className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/60"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={getThumbnail(
                              episode,
                              index
                            )}
                            alt={episode.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                          <Link
                            to={`/episodes/${episode.id}`}
                            className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/50 bg-slate-950/80 text-cyan-400 backdrop-blur transition hover:scale-110"
                          >
                            <Play
                              size={19}
                              fill="currentColor"
                            />
                          </Link>

                          {episode.duration_seconds && (
                            <span className="absolute bottom-4 right-4 rounded-lg bg-slate-950/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
                              {formatDuration(
                                episode.duration_seconds
                              )}
                            </span>
                          )}
                        </div>

                        <div className="p-5">
                          <h3 className="line-clamp-2 text-lg font-bold">
                            {episode.title}
                          </h3>

                          <p className="mt-3 text-sm text-slate-400">
                            {episode.guest?.name ||
                              "NerdsPodcast"}
                          </p>

                          {episode.category && (
                            <span className="mt-4 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                              {episode.category.name}
                            </span>
                          )}
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}
          </div>
        </div>
      </section>

      {/* ================= MORE THAN A PODCAST ================= */}

      <section className="border-b border-slate-800 bg-slate-900">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute h-full w-full object-cover"
            >
              <source
                src="/videos/podcast-animation.mp4"
                type="video/mp4"
              />
            </video>

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />

            <div className="absolute bottom-10 left-6 max-w-sm rounded-2xl border border-cyan-400/40 bg-slate-950/80 p-6 backdrop-blur-xl sm:left-10">
              <p className="text-3xl text-cyan-400">
                “
              </p>

              <p className="mt-2 text-lg font-semibold leading-7">
                Great conversations create great
                opportunities.
              </p>

              <p className="mt-4 text-sm text-slate-400">
                — NerdsPodcast
              </p>
            </div>
          </div>

          <div className="flex items-center bg-slate-100 px-6 py-20 text-slate-950 sm:px-12 lg:px-20">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-600">
                MORE THAN A PODCAST
              </p>

              <h2 className="mt-4 text-5xl font-black leading-tight">
                Real People.
                <br />
                Real Stories.
                <br />
                <span className="text-cyan-600">
                  Real Impact.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                We bring together engineers, founders,
                researchers, creators and curious minds to
                explore the ideas shaping our world.
              </p>

              <Link
                to="/guests"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore Our Guests
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
            EXPLORE BY CATEGORY
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Topics you'll love
          </h2>

          <p className="mt-3 text-slate-400">
            Discover conversations that match your interests.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  to="/categories"
                  className="group relative min-h-[190px] overflow-hidden rounded-2xl border border-slate-800"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-slate-950/70 transition group-hover:bg-slate-950/55" />

                  <div className="relative flex h-full min-h-[190px] flex-col justify-end p-5">
                    <Icon
                      size={32}
                      className="mb-4 text-cyan-400"
                    />

                    <h3 className="font-bold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-300">
                      {category.episodes}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ASK QUESTION ================= */}

      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-25"
          >
            <source
              src="/videos/podcast-animation.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-slate-950/75" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              BE PART OF THE CONVERSATION
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-6xl">
              Have a question
              <br />
              for our next guest?
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Your question could become part of a future
              NerdsPodcast conversation.
            </p>

            <Link
              to="/ask-question"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              <MessageCircle size={19} />
              Ask a Question
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Newsletter */}

          <form
            onSubmit={handleSubscribe}
            className="mt-14 grid gap-5 rounded-2xl border border-cyan-400/30 bg-slate-950/75 p-6 backdrop-blur-lg lg:grid-cols-[1fr_auto]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <Mail size={25} />
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Stay in the loop
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Get the latest episodes, guest updates and
                  exclusive content.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                required
                className="min-w-[260px] rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

              <button
                type="submit"
                className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= WELCOME POPUP ================= */}

      {showWelcome && (
        <div className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-[slideUp_0.4s_ease-out]">
          <div className="relative rounded-2xl border border-cyan-400/40 bg-slate-950 p-6 shadow-2xl shadow-cyan-950/40">
            <button
              type="button"
              onClick={() => setShowWelcome(false)}
              className="absolute right-4 top-4 text-slate-400 transition hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                <Mic2 size={27} />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Welcome to NerdsPodcast!
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Explore episodes, discover interesting
                  guests and join meaningful conversations.
                </p>

                <Link
                  to="/episodes"
                  onClick={() =>
                    setShowWelcome(false)
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950"
                >
                  Start Exploring
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;