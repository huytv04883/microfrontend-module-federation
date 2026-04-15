import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
      <h1 className="text-9xl font-bold m-0">404</h1>
      <p className="text-2xl mb-6">Page not found</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Go home
      </button>
    </div>
  );
}
