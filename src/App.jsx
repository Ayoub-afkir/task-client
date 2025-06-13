import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
  <Routes>
    {/* صفحة تسجيل الدخول غير محمية */}
    <Route path="/login" element={<Login />} />

    {/* باقي الصفحات محمية */}
    <Route
      path="/tasks"
      element={
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
      }
    />
    <Route
      path="/add-task"
      element={
        <ProtectedRoute>
          <AddTask />
        </ProtectedRoute>
      }
    />
    <Route
      path="/tasks/:id/edit"
      element={
        <ProtectedRoute>
          <EditTask />
        </ProtectedRoute>
      }
    />
  </Routes>
</AuthProvider>
  );
}
