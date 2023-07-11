// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//PAGES AKA REACT ROUTES

//COMPONENT
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
