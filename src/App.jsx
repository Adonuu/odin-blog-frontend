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
import { CreateComment } from './pages/createComment';

// components
import { ManagePost } from './components/managePost';
import { PostDisplay } from './components/postDisplay';
import { ManageComment } from './components/manageComment';


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
      { path: "admin/managePost/:id", element: <ProtectedRoute><ManagePost /></ProtectedRoute> },
      { path: "post/:id", element: <PostDisplay /> },
      { path: "comment/:id", element: <CreateComment /> },
      { path: "comment/manageComment/:id", element: <ProtectedRoute><ManageComment /></ProtectedRoute> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
