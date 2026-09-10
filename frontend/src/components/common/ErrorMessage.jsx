function ErrorMessage({
  message = "Something went wrong. Please try again.",
}) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {message}
    </div>
  );
}

export default ErrorMessage;