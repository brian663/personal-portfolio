import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
/*
import "./styles/root.css";
import "./styles/responsive.css";
import "./styles/components/navbar.css";
import "./styles/components/home.css";
import "./styles/components/about.css";
import "./styles/components/skills.css";
import "./styles/components/projects.css";
import "./styles/components/footer.css";
import "./styles/components/contact.css";
*/
import "./index.css";
import "./App.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
