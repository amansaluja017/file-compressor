import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router";
import App from "./App.tsx";
import {
  HomePage,
  LoginPage,
  SignupPage,
  LandingPage
} from "./pages/index.ts"
import { Provider } from "react-redux";
import { store } from "./store/Store.ts";
import { UserProtector } from "./components/index.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={
        <UserProtector>
          <HomePage />
        </UserProtector>
      } />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
