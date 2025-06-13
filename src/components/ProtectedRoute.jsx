import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center min-h-[200px]">
  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  <p className="ml-3 text-gray-600">Loading...</p>
</div>
;
  if (!user) return <Navigate to="/login" />;

  return children;
}
