interface Props {
  message: string | null;
}

export function Toast({message}: Props) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-rise fixed bottom-[calc(env(safe-area-inset-bottom,0px)+6rem)] left-1/2 z-[60] w-max max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full text-center lg:bottom-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] bg-ink px-5 py-3 text-[0.95rem] text-paper shadow-lg">
      {message}
    </div>
  );
}
