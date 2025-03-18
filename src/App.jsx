import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './components/protectedRoute';
import './App.css';

// layout
import { Layout } from './layout';

// Pages
import { Index } from './pages/index';
import { Login } from './pages/login';
import { SignUp } from './pages/signup';
import { Admin } from './pages/admin';
import { CreatePost } from './pages/createPost';


// Create the router with a layout wrapper
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Index /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "admin", element: <ProtectedRoute><Admin /></ProtectedRoute> },
      { path: "admin/createPost", element: <ProtectedRoute><CreatePost /></ProtectedRoute> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
