import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function EditTask() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // جلب بيانات المهمة
  const fetchTask = async () => {
    try {
      const token = localStorage.getItem("token" );
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await api.get(`/tasks/${id}`);
      setTitle(res.data.title);
    } catch (err) {
      setError('Failed to load task.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem("token" );
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await api.put(`/tasks/${id}`, { title });
      navigate('/tasks');
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (loading) return <p className="p-4">Loading task...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
