import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./context/AppContext.jsx";
import { MotionConfig } from "motion/react";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <MotionConfig viewport={{ once: true }}>
        <App />
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>
);
