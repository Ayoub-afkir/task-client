import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import EditTask from './EditTask';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب المهام من API
  const fetchTasks = async () => {
    try {

    
      const token = localStorage.getItem("token" );
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/tasks'); // ← Laravel API
    

      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token" )}`;
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id)); // تحديث القائمة بدون الحاجة لإعادة التحميل
    } catch (err) {
      alert("Failed to delete task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
   <div className="p-6 max-w-4xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-gray-800">📝 Task Notes</h1>

  <Link
    to="/add-task"
    className="inline-block mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition"
  >
    + Add Task
  </Link>

  {loading ? (
    <p className="text-gray-500">Loading tasks...</p>
  ) : tasks.length === 0 ? (
    <p className="text-gray-500">No tasks found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h2>

          <div className="flex justify-end space-x-2 mt-auto">
            <Link
              to={`/tasks/${task.id}/edit`}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );
}
