import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/main.css";
import { GalleryProvider } from "./Context/Gallerycontext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GalleryProvider>
      <App />
    </GalleryProvider>
  </BrowserRouter>
);