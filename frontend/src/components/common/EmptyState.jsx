function EmptyState({
  title = "No data found",
  message = "There is currently nothing to display.",
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-slate-400">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;