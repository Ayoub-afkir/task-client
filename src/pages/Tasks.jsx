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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
<Link
  to="/add-task"
  className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded"
>
  + Add Task
</Link>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white shadow p-3 rounded flex justify-between"
            >
              <span>{task.title}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >Delete</button>
             <Link
  to={`/tasks/${task.id}/edit`}
  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm mr-2"
>Edit</Link>
            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
