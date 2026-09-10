import { useEffect, useState } from "react";

import { getCategories } from "../api/categories";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Unable to load categories."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold text-cyan-400">
        TOPICS
      </p>

      <h1 className="mt-2 text-4xl font-black">
        Podcast Categories
      </h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Explore conversations organised by topic and
        area of interest.
      </p>

      <div className="mt-10">
        {loading && <Loader />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading &&
          !error &&
          categories.length === 0 && (
            <EmptyState
              title="No categories available"
              message="Categories will appear here."
            />
          )}

        {!loading &&
          !error &&
          categories.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <article
                  key={category.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400/50"
                >
                  <h2 className="text-xl font-bold">
                    {category.name}
                  </h2>

                  {category.description && (
                    <p className="mt-3 leading-6 text-slate-400">
                      {category.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}

export default Categories;