import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import MainMenu from "./component/MainMenu.jsx";
import Home from "./component/Home.jsx";
import About from "./component/About.jsx";
import Contact from "./component/Contact.jsx";
import { Provider } from "./component/Context/ContextAPI.jsx";
import { ErrorBoundary } from "react-error-boundary";
// import "./bones/registry";
const SignIn = lazy(() => import("./component/SignIn.jsx"));
const SignUp = lazy(() => import("./component/SignUp.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SignIn /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "main", element: <MainMenu /> },
    ],
  },
  {
    path: "/main",
    element: <MainMenu />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <Provider>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
