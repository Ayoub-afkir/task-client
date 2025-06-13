import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token" );
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setError('');
    try {
      await api.post('/tasks', { title });
      navigate('/tasks'); // ← بعد الإضافة، انتقل إلى صفحة المهام
    } catch (err) {
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
