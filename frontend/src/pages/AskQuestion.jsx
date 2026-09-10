import { useEffect, useState } from "react";

import { getGuests } from "../api/guests";
import { createQuestion } from "../api/questions";

function AskQuestion() {
  const [guests, setGuests] = useState([]);
  const [formData, setFormData] = useState({
    visitor_name: "",
    visitor_email: "",
    question: "",
    guest_id: "",
  });

  const [loadingGuests, setLoadingGuests] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadGuests = async () => {
      try {
        const data = await getGuests();
        setGuests(data);
      } catch {
        setError(
          "Unable to load guests. Please try again later."
        );
      } finally {
        setLoadingGuests(false);
      }
    };

    loadGuests();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!formData.guest_id) {
      setError("Please select a guest.");
      return;
    }

    try {
      setSubmitting(true);

      await createQuestion({
        visitor_name: formData.visitor_name,
        visitor_email: formData.visitor_email,
        question: formData.question,
        guest_id: Number(formData.guest_id),
      });

      setMessage(
        "Your question was submitted successfully."
      );

      setFormData({
        visitor_name: "",
        visitor_email: "",
        question: "",
        guest_id: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to submit your question."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold text-cyan-400">
        COMMUNITY
      </p>

      <h1 className="mt-2 text-4xl font-black">
        Ask a Question
      </h1>

      <p className="mt-4 text-slate-400">
        Submit a question for one of our guests.
        Approved questions can be used in future
        conversations.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8"
      >
        {message && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Your Name
            </label>

            <input
              type="text"
              name="visitor_name"
              value={formData.visitor_name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Your Email
            </label>

            <input
              type="email"
              name="visitor_email"
              value={formData.visitor_email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium">
            Select Guest
          </label>

          <select
            name="guest_id"
            value={formData.guest_id}
            onChange={handleChange}
            required
            disabled={loadingGuests}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option value="">
              {loadingGuests
                ? "Loading guests..."
                : "Select a guest"}
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
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium">
            Your Question
          </label>

          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Write your question here..."
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Submitting..."
            : "Submit Question"}
        </button>
      </form>
    </section>
  );
}

export default AskQuestion;