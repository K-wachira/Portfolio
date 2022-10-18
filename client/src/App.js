import "./App.css";
import MyNavbar from "./Components/Shared/Navbar.jsx";
import Views from "./Components/Views.jsx";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <ToastContainer />
      <MyNavbar />
      <Views />
    </Router>
  );
}

export default App;
