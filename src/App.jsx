import { BrowserRouter } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";

function App() {
  return (
    <BrowserRouter>
      <ApplicationViews />
    </BrowserRouter>
  );
}

export default App;
