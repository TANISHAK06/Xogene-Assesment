import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./Components/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/drug/:id" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
