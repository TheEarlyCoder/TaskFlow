const LoadingScreen = ({ message = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white">
      {/* Spinner */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-orange-500"></div>

      {/* Message */}
      <h2 className="mt-6 text-xl font-semibold">
        {message}
      </h2>

      <p className="mt-2 text-sm text-neutral-400">
        This will only take a moment.
      </p>
    </div>
  );
};

export default LoadingScreen;