import { BrowserRouter } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews.jsx";
function App() {
  return (
    <BrowserRouter>
      <ApplicationViews />
    </BrowserRouter>
  );
}

export default App;
