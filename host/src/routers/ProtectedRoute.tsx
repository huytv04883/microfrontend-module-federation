import { useAuth } from '@clerk/react';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
