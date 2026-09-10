import { useEffect, useState } from "react";
import {
  Edit,
  FolderPlus,
  Trash2,
} from "lucide-react";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../api/categories";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const categoryData = {
        name: name.trim(),
        description: description.trim() || null,
      };

      if (editingId) {
        await updateCategory(
          editingId,
          categoryData
        );
      } else {
        await createCategory(categoryData);
      }

      resetForm();

      await loadCategories();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to save category."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);

    setName(category.name || "");

    setDescription(
      category.description || ""
    );

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteCategory(categoryId);

      if (editingId === categoryId) {
        resetForm();
      }

      await loadCategories();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to delete category."
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-black text-white">
            Manage Categories
          </h1>

          <p className="mt-2 text-slate-400">
            Create, update, and remove podcast categories.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* FORM */}
        <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <FolderPlus
              size={22}
              className="text-cyan-400"
            />

            <h2 className="text-xl font-bold text-white">
              {editingId
                ? "Edit Category"
                : "Add Category"}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Category Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Example: Artificial Intelligence"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows="5"
                placeholder="Brief description of this category"
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Saving..."
                  : editingId
                    ? "Update Category"
                    : "Create Category"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-300 transition hover:border-slate-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* CATEGORY LIST */}
        <div>
          {error && (
            <div className="mb-5">
              <ErrorMessage message={error} />
            </div>
          )}

          {categories.length === 0 ? (
            <EmptyState
              title="No categories found"
              message="Create your first podcast category."
            />
          ) : (
            <div className="grid gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {category.name}
                    </h2>

                    {category.description && (
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(category)
                      }
                      className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                    >
                      <Edit size={17} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(category.id)
                      }
                      className="flex items-center gap-2 rounded-lg border border-red-900/70 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-950/30"
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ManageCategories;