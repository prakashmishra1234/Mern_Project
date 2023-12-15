import "./App.css";
import SimpleBackdrop from "./Components/common/SimpleBackdrop";
import { Store } from "./Store";
import Navigation from "./routing/Navigation";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Store>
      <SimpleBackdrop />
      <Toaster />
      <Navigation />
    </Store>
  );
}

export default App;
