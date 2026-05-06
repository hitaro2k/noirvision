import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import KikoUgcLanding from "./landings/KikoUgcLanding.jsx";
import PatagoniaGoreTexLanding from "./landings/PatagoniaGoreTexLanding.jsx";
import "./styles.css";

const landingPages = {
  kiko: KikoUgcLanding,
  patagonia: PatagoniaGoreTexLanding
};

const landingKey = new URLSearchParams(window.location.search).get("landing");
const RootComponent = landingPages[landingKey] || App;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
