// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//PAGES AKA REACT ROUTES
import Index from "./Pages/Index";
import Show from "./Pages/Show";
import Edit from "./Pages/Edit";
import New from "./Pages/New";

//COMPONENT
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/transactions" element={<Index />} />
            <Route path="/transactions/:id" element={<Show />} />
            <Route path="/transactions/:id/edit" element={<Edit />} />
            <Route path="/transactions/new" element={<New />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
