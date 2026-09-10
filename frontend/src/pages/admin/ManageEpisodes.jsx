import { useEffect, useState } from "react";
import {
  Edit,
  Plus,
  Trash2,
  Video,
} from "lucide-react";

import {
  createEpisode,
  deleteEpisode,
  getEpisodes,
  updateEpisode,
} from "../../api/episodes";

import { getGuests } from "../../api/guests";
import { getHosts } from "../../api/hosts";
import { getCategories } from "../../api/categories";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

function ManageEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [guests, setGuests] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");
  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] = useState({
    episode_number: "",
    title: "",
    description: "",
    youtube_url: "",
    youtube_video_id: "",
    thumbnail_url: "",
    duration_seconds: "",
    guest_id: "",
    category_id: "",
    host_ids: [],
    is_published: false,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        episodeData,
        guestData,
        hostData,
        categoryData,
      ] = await Promise.all([
        getEpisodes(),
        getGuests(),
        getHosts(),
        getCategories(),
      ]);

      setEpisodes(episodeData);
      setGuests(guestData);
      setHosts(hostData);
      setCategories(categoryData);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to load episode data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleHostChange = (hostId) => {
    setFormData((currentData) => {
      const numericId = Number(hostId);

      const alreadySelected =
        currentData.host_ids.includes(
          numericId
        );

      return {
        ...currentData,
        host_ids: alreadySelected
          ? currentData.host_ids.filter(
              (id) => id !== numericId
            )
          : [
              ...currentData.host_ids,
              numericId,
            ],
      };
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      episode_number: "",
      title: "",
      description: "",
      youtube_url: "",
      youtube_video_id: "",
      thumbnail_url: "",
      duration_seconds: "",
      guest_id: "",
      category_id: "",
      host_ids: [],
      is_published: false,
    });

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.episode_number ||
      !formData.title.trim() ||
      !formData.guest_id ||
      !formData.category_id ||
      formData.host_ids.length === 0
    ) {
      setError(
        "Episode number, title, guest, category, and at least one host are required."
      );

      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const episodeData = {
        episode_number: Number(
          formData.episode_number
        ),
        title: formData.title.trim(),
        description:
          formData.description.trim() || null,
        youtube_url:
          formData.youtube_url.trim() || null,
        youtube_video_id:
          formData.youtube_video_id.trim() ||
          null,
        thumbnail_url:
          formData.thumbnail_url.trim() || null,
        duration_seconds:
          formData.duration_seconds
            ? Number(
                formData.duration_seconds
              )
            : null,
        guest_id: Number(
          formData.guest_id
        ),
        category_id: Number(
          formData.category_id
        ),
        host_ids: formData.host_ids,
        is_published:
          formData.is_published,
      };

      if (editingId) {
        await updateEpisode(
          editingId,
          episodeData
        );
      } else {
        await createEpisode(
          episodeData
        );
      }

      resetForm();

      await loadData();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to save episode."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (episode) => {
    setEditingId(episode.id);

    setFormData({
      episode_number:
        episode.episode_number || "",
      title: episode.title || "",
      description:
        episode.description || "",
      youtube_url:
        episode.youtube_url || "",
      youtube_video_id:
        episode.youtube_video_id || "",
      thumbnail_url:
        episode.thumbnail_url || "",
      duration_seconds:
        episode.duration_seconds || "",
      guest_id:
        episode.guest?.id ||
        episode.guest_id ||
        "",
      category_id:
        episode.category?.id ||
        episode.category_id ||
        "",
      host_ids:
        episode.hosts?.map(
          (host) => host.id
        ) || [],
      is_published:
        episode.is_published || false,
    });

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (
    episodeId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this episode?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteEpisode(episodeId);

      if (editingId === episodeId) {
        resetForm();
      }

      await loadData();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to delete episode."
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
          Manage Episodes
        </h1>

        <p className="mt-2 text-slate-400">
          Create, update, publish, and manage
          podcast episodes.
        </p>
      </div>

      {error && (
        <div className="mt-6">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="mt-8 grid gap-8 xl:grid-cols-[440px_1fr]">
        <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <Video
              size={22}
              className="text-cyan-400"
            />

            <h2 className="text-xl font-bold text-white">
              {editingId
                ? "Edit Episode"
                : "Add Episode"}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            <input
              type="number"
              name="episode_number"
              value={
                formData.episode_number
              }
              onChange={handleChange}
              placeholder="Episode number"
              min="1"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Episode title"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              rows="4"
              placeholder="Episode description"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="youtube_url"
              value={
                formData.youtube_url
              }
              onChange={handleChange}
              placeholder="YouTube URL"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="youtube_video_id"
              value={
                formData.youtube_video_id
              }
              onChange={handleChange}
              placeholder="YouTube video ID"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="thumbnail_url"
              value={
                formData.thumbnail_url
              }
              onChange={handleChange}
              placeholder="Thumbnail URL"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              type="number"
              name="duration_seconds"
              value={
                formData.duration_seconds
              }
              onChange={handleChange}
              placeholder="Duration in seconds"
              min="0"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <select
              name="guest_id"
              value={formData.guest_id}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="">
                Select guest
              </option>

              {guests.map((guest) => (
                <option
                  key={guest.id}
                  value={guest.id}
                >
                  {guest.name}
                </option>
              ))}
            </select>

            <select
              name="category_id"
              value={
                formData.category_id
              }
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="">
                Select category
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>

            <div className="rounded-xl border border-slate-700 p-4">
              <p className="mb-3 font-semibold text-slate-300">
                Select Hosts
              </p>

              <div className="space-y-2">
                {hosts.map((host) => (
                  <label
                    key={host.id}
                    className="flex cursor-pointer items-center gap-3 text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={
                        formData.host_ids.includes(
                          host.id
                        )
                      }
                      onChange={() =>
                        handleHostChange(
                          host.id
                        )
                      }
                    />

                    {host.name}
                  </label>
                ))}
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 text-slate-300">
              <input
                type="checkbox"
                name="is_published"
                checked={
                  formData.is_published
                }
                onChange={handleChange}
              />

              Publish episode
            </label>

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
                    ? "Update Episode"
                    : "Create Episode"}
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
          {episodes.length === 0 ? (
            <EmptyState
              title="No episodes found"
              message="Create your first podcast episode."
            />
          ) : (
            <div className="grid gap-4">
              {episodes.map(
                (episode) => (
                  <div
                    key={episode.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400">
                          Episode #
                          {episode.episode_number}
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-white">
                          {episode.title}
                        </h2>

                        {episode.description && (
                          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                            {
                              episode.description
                            }
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
                          {episode.guest && (
                            <span>
                              Guest:{" "}
                              {
                                episode.guest
                                  .name
                              }
                            </span>
                          )}

                          {episode.category && (
                            <span>
                              Category:{" "}
                              {
                                episode.category
                                  .name
                              }
                            </span>
                          )}

                          <span
                            className={
                              episode.is_published
                                ? "text-emerald-400"
                                : "text-yellow-400"
                            }
                          >
                            {episode.is_published
                              ? "Published"
                              : "Draft"}
                          </span>
                        </div>
                      </div>

                      <div className="flex h-fit gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              episode
                            )
                          }
                          className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
                        >
                          <Edit size={17} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              episode.id
                            )
                          }
                          className="flex items-center gap-2 rounded-lg border border-red-900 px-3 py-2 text-red-400"
                        >
                          <Trash2 size={17} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ManageEpisodes;