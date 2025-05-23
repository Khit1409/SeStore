import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "../src/icons/fontawesome.ts";
import { Provider } from "react-redux";
import { appStore } from "./features/app.store.ts";
import App from "./App.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </StrictMode>
);
