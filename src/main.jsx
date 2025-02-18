import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import { Login, Protected } from "./components/index.js";
import "./index.css";
import { AddPost, AllPosts, EditPost, Home, Post, Signup } from "./Pages";
import store from "./store/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Public Routes (Restricted for logged-in users) */}
      <Route
        index
        element={
          <Protected authentication={false}>
            <Home />
          </Protected>
        }
      />
      <Route
        path='login'
        element={
          <Protected authentication={false}>
            <Login />
          </Protected>
        }
      />
      <Route
        path='signup'
        element={
          <Protected authentication={false}>
            <Signup />
          </Protected>
        }
      />

      {/* Protected Routes (Restricted for non-logged-in users) */}
      <Route
        path='all-post'
        element={
          <Protected authentication>
            <AllPosts />
          </Protected>
        }
      />
      <Route
        path='add-post'
        element={
          <Protected authentication>
            <AddPost />
          </Protected>
        }
      />
      <Route
        path='edit-post/:slug'
        element={
          <Protected authentication>
            <EditPost />
          </Protected>
        }
      />
      <Route
        path='post/:slug'
        element={
          <Protected authentication>
            <Post />
          </Protected>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
