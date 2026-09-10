import { Link } from "react-router-dom";
import {
  Mic2,
  Mail,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
                <Mic2 size={22} />
              </div>

              <span className="text-xl font-black text-white">
                Nerds
                <span className="text-cyan-400">
                  Podcast
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Conversations with innovators, creators,
              engineers, entrepreneurs, and thinkers
              shaping technology and the future.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <a
                href="#"
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                YouTube
              </a>

              <a
                href="#"
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                LinkedIn
              </a>

              <a
                href="#"
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                X / Twitter
              </a>

            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/episodes"
                className="text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Episodes
              </Link>

              <Link
                to="/guests"
                className="text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Guests
              </Link>

              <Link
                to="/hosts"
                className="text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Hosts
              </Link>

              <Link
                to="/categories"
                className="text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Categories
              </Link>

            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Community
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/ask-question"
                className="text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Ask a Question
              </Link>

              <a
                href="mailto:hello@nerdspodcast.com"
                className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Contact Us
                <ArrowUpRight size={14} />
              </a>

              <Link
                to="/admin/login"
                className="text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Admin Login
              </Link>

            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <h3 className="text-lg font-bold text-white">
                Stay connected with NerdsPodcast
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Get updates about new episodes and conversations.
              </p>
            </div>

            <a
              href="mailto:hello@nerdspodcast.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              <Mail size={18} />
              Contact Us
            </a>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {currentYear} NerdsPodcast. All rights reserved.
          </p>

          <div className="flex gap-5">

            <a
              href="#"
              className="transition hover:text-cyan-400"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition hover:text-cyan-400"
            >
              Terms
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;