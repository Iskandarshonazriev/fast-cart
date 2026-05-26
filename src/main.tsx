import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { ThemeProvider } from "next-themes";
import "./i18n";
ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>
<ThemeProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem
>

      <App />

    </ThemeProvider>

  </React.StrictMode>
);