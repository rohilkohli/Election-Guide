export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
    >
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
      <p className="text-gray-400 text-sm font-medium">Loading…</p>
    </div>
  );
}
