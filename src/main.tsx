import { createRoot } from "react-dom/client";
import App from "./App";
// @ts-expect-error
import "./assets/styles/main.css";

createRoot(document.getElementById("root")!).render(<App />);
