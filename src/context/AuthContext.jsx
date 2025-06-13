import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token" );
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await api.get('/user');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const login = async (data) => {
    await api.get('/sanctum/csrf-cookie'); // مهم جدا!
    await api.post('/login', data);
    await getUser();
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
