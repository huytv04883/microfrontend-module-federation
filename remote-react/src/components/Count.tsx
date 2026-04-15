import { useState } from "react";

export default function Count() {
  const [count, setCount] = useState(0);
  return (
    <div className="p-5 border-2 border-[#61dafb] rounded-xl bg-[#e8f7fd] max-w-xs">
      <p className="mb-3">
        Count number: <strong>{count}</strong>
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-[#61dafb] border-none rounded-md cursor-pointer font-bold hover:opacity-80 transition-opacity"
      >
        + Plus
      </button>
    </div>
  );
}

