import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
import { CreateProperty } from "./pages/create-property";
import { Home } from "./pages/home";
import { SavedProperty } from "./pages/saved-property";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-property" element={<CreateProperty />} />
          <Route path="/saved-property" element={<SavedProperty />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;