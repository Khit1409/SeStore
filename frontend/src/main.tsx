import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//import css
import "./index.css";
import App from "./App.tsx";
import "../src/icons/fontawesome.ts";
import { Provider } from "react-redux";
import { authStore } from "./redux/authStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={authStore}>
      <App />
    </Provider>
  </StrictMode>
);
