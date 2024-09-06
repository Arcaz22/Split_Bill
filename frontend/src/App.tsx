import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './views/authentication/register';
import Login from './views/authentication/login';
import { Dashboard } from './views/dashboard';
import { PrivateRoute } from './components/privateRoute';
import { Layout } from './components/layout';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Friend } from './views/friend';
import { NotFound } from './lib/components/not-found';
import { Settings } from './views/dashboard/settings';

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
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="friends" element={<Friend />} />
                <Route path="profile" element={<Settings />} />
            </Route>
        </Route>
      </Routes>
    </Router>
  );
};
