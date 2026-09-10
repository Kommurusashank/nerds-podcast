import { useEffect, useState } from "react";
import { Edit, Plus, Trash2, UserRound } from "lucide-react";

import {
  createGuest,
  deleteGuest,
  getGuests,
  updateGuest,
} from "../../api/guests";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

function ManageGuests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    short_bio: "",
    expertise: "",
    profile_image_url: "",
  });

  const loadGuests = async () => {
    try {
      setLoading(true);
      setError("");

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

  useEffect(() => {
    loadGuests();
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
      designation: "",
      company: "",
      short_bio: "",
      expertise: "",
      profile_image_url: "",
    });

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Guest name is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const guestData = {
        name: formData.name.trim(),
        designation:
          formData.designation.trim() || null,
        company:
          formData.company.trim() || null,
        short_bio:
          formData.short_bio.trim() || null,
        expertise:
          formData.expertise.trim() || null,
        profile_image_url:
          formData.profile_image_url.trim() || null,
      };

      if (editingId) {
        await updateGuest(
          editingId,
          guestData
        );
      } else {
        await createGuest(guestData);
      }

      resetForm();

      await loadGuests();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to save guest."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (guest) => {
    setEditingId(guest.id);

    setFormData({
      name: guest.name || "",
      designation:
        guest.designation || "",
      company: guest.company || "",
      short_bio:
        guest.short_bio || "",
      expertise:
        guest.expertise || "",
      profile_image_url:
        guest.profile_image_url || "",
    });

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (guestId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this guest?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteGuest(guestId);

      if (editingId === guestId) {
        resetForm();
      }

      await loadGuests();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to delete guest."
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
          Manage Guests
        </h1>

        <p className="mt-2 text-slate-400">
          Create, update, and manage podcast guests.
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
                ? "Edit Guest"
                : "Add Guest"}
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
              placeholder="Guest name"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <textarea
              name="short_bio"
              value={formData.short_bio}
              onChange={handleChange}
              rows="4"
              placeholder="Short biography"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              placeholder="Expertise"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
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
                    ? "Update Guest"
                    : "Create Guest"}
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
          {guests.length === 0 ? (
            <EmptyState
              title="No guests found"
              message="Create your first podcast guest."
            />
          ) : (
            <div className="grid gap-4">
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {guest.name}
                      </h2>

                      <p className="mt-1 text-cyan-400">
                        {guest.designation}
                      </p>

                      {guest.company && (
                        <p className="mt-1 text-sm text-slate-400">
                          {guest.company}
                        </p>
                      )}

                      {guest.short_bio && (
                        <p className="mt-3 text-sm text-slate-400">
                          {guest.short_bio}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(guest)
                        }
                        className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
                      >
                        <Edit size={17} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(guest.id)
                        }
                        className="flex items-center gap-2 rounded-lg border border-red-900 px-3 py-2 text-red-400"
                      >
                        <Trash2 size={17} />
                        Delete
                      </button>
                    </div>
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

export default ManageGuests;