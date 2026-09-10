import { useEffect, useState } from "react";
import {
  Edit,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  createHost,
  deleteHost,
  getHosts,
  updateHost,
} from "../../api/hosts";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

function ManageHosts() {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profile_image_url: "",
  });

  const loadHosts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getHosts();

      setHosts(data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to load hosts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHosts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      name: "",
      bio: "",
      profile_image_url: "",
    });

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Host name is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const hostData = {
        name: formData.name.trim(),
        bio:
          formData.bio.trim() || null,
        profile_image_url:
          formData.profile_image_url.trim() || null,
      };

      if (editingId) {
        await updateHost(
          editingId,
          hostData
        );
      } else {
        await createHost(hostData);
      }

      resetForm();

      await loadHosts();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to save host."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (host) => {
    setEditingId(host.id);

    setFormData({
      name: host.name || "",
      bio: host.bio || "",
      profile_image_url:
        host.profile_image_url || "",
    });

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (hostId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this host?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteHost(hostId);

      if (editingId === hostId) {
        resetForm();
      }

      await loadHosts();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to delete host."
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="p-6 sm:p-8">
      <div>
        <h1 className="text-3xl font-black text-white">
          Manage Hosts
        </h1>

        <p className="mt-2 text-slate-400">
          Create and manage podcast hosts.
        </p>
      </div>

      {error && (
        <div className="mt-6">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[400px_1fr]">
        <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <UserRound
              size={22}
              className="text-cyan-400"
            />

            <h2 className="text-xl font-bold text-white">
              {editingId
                ? "Edit Host"
                : "Add Host"}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Host name"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="5"
              placeholder="Host biography"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="profile_image_url"
              value={formData.profile_image_url}
              onChange={handleChange}
              placeholder="Profile image URL"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 disabled:opacity-60"
              >
                <Plus size={18} />

                {submitting
                  ? "Saving..."
                  : editingId
                    ? "Update Host"
                    : "Create Host"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-700 px-4 py-3 text-slate-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          {hosts.length === 0 ? (
            <EmptyState
              title="No hosts found"
              message="Create your first podcast host."
            />
          ) : (
            <div className="grid gap-4">
              {hosts.map((host) => (
                <div
                  key={host.id}
                  className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:flex-row"
                >
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {host.name}
                    </h2>

                    {host.bio && (
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                        {host.bio}
                      </p>
                    )}
                  </div>

                  <div className="flex h-fit gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(host)
                      }
                      className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
                    >
                      <Edit size={17} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(host.id)
                      }
                      className="flex items-center gap-2 rounded-lg border border-red-900 px-3 py-2 text-red-400"
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

export default ManageHosts;