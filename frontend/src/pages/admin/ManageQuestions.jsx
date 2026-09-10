import { useEffect, useState } from "react";
import {
  CheckCircle,
  MessageSquare,
  Trash2,
} from "lucide-react";

import {
  approveQuestion,
  deleteQuestion,
  getQuestions,
} from "../../api/questions";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

function ManageQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] =
    useState(null);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getQuestions();

      setQuestions(data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to load questions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleApprove = async (
    questionId
  ) => {
    try {
      setProcessingId(questionId);
      setError("");

      await approveQuestion(questionId);

      await loadQuestions();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to approve question."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (
    questionId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(questionId);
      setError("");

      await deleteQuestion(questionId);

      await loadQuestions();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to delete question."
      );
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="p-6 sm:p-8">
      <div>
        <h1 className="text-3xl font-black text-white">
          Manage Questions
        </h1>

        <p className="mt-2 text-slate-400">
          Review, approve, and remove audience
          questions.
        </p>
      </div>

      {error && (
        <div className="mt-6">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="mt-8">
        {questions.length === 0 ? (
          <EmptyState
            title="No questions found"
            message="Audience questions will appear here."
          />
        ) : (
          <div className="grid gap-5">
            {questions.map((question) => (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-col justify-between gap-5 lg:flex-row">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <MessageSquare
                        size={22}
                        className="shrink-0 text-cyan-400"
                      />

                      <h2 className="text-lg font-bold text-white">
                        Question #{question.id}
                      </h2>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {Object.entries(question).map(
                        ([key, value]) => {
                          if (
                            key === "id" ||
                            key ===
                              "is_approved"
                          ) {
                            return null;
                          }

                          if (
                            value === null ||
                            value === undefined
                          ) {
                            return null;
                          }

                          if (
                            typeof value ===
                            "object"
                          ) {
                            return null;
                          }

                          return (
                            <div
                              key={key}
                              className="text-sm"
                            >
                              <span className="font-semibold capitalize text-slate-300">
                                {key.replaceAll(
                                  "_",
                                  " "
                                )}
                                :
                              </span>

                              <span className="ml-2 text-slate-400">
                                {String(value)}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>

                    <div className="mt-5">
                      {question.is_approved ? (
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                          Approved
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-sm font-semibold text-yellow-400">
                          Pending Approval
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex h-fit flex-wrap gap-3">
                    {!question.is_approved && (
                      <button
                        type="button"
                        disabled={
                          processingId ===
                          question.id
                        }
                        onClick={() =>
                          handleApprove(
                            question.id
                          )
                        }
                        className="flex items-center gap-2 rounded-lg border border-emerald-800 px-4 py-2 font-semibold text-emerald-400 disabled:opacity-50"
                      >
                        <CheckCircle size={18} />

                        {processingId ===
                        question.id
                          ? "Processing..."
                          : "Approve"}
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={
                        processingId ===
                        question.id
                      }
                      onClick={() =>
                        handleDelete(
                          question.id
                        )
                      }
                      className="flex items-center gap-2 rounded-lg border border-red-900 px-4 py-2 font-semibold text-red-400 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ManageQuestions;