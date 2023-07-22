import ReactDOM from "react-dom/client";
import { init } from "@neutralinojs/lib";
import App from "./App.tsx";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

init();
