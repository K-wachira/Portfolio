import "./App.css";
import MyNavbar from "./Components/Shared/Navbar.jsx";
import Views from "./Components/Views.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <MyNavbar />
        <Views />
      </Router>
  );
}

export default App;
