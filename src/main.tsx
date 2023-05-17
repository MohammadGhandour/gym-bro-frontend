import ReactDOM from "react-dom/client";
import App from "./App";
import "./custom.scss";
import { BrowserRouter } from 'react-router-dom';
import { WorkoutsContextProvider } from "./Context/WorkoutsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </BrowserRouter>
)
