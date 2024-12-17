import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./Components/Search";
import DrugDetails from "./Components/DrugDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/drug/:id" element={<DrugDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
