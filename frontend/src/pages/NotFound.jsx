import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 text-center">
      <div>
        <p className="text-7xl font-black text-cyan-400">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-3 text-slate-400">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;