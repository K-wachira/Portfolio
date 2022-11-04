import "./App.css";
import "./index.scss";

import MyNavbar from "./Components/Shared/Navbar.jsx";
import MyFooter from "./Components/Shared/Footer.jsx";
import Views from "./Components/Views.jsx";
import { ToastContainer, Zoom } from "react-toastify";

import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <ToastContainer transition={Zoom} />
      <MyNavbar />
      <Views />
      {/* <MyFooter/> */}
    </Router>
  );
}

export default App;
