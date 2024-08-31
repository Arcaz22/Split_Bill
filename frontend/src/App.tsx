import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './views/authentication/register';
import Login from './views/authentication/login';
import { Dashboard } from './views/dashboard';
import { PrivateRoute } from './components/privateRoute';
import { ToastContainer } from "react-toastify";

export const App: React.FC = () => {
  return (
    <Router>
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
};
