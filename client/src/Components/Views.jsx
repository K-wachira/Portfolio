import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import Home from "./Users/Home/Home.jsx";
import Contact from "./Users/Home/Contact.jsx";
import PageNotFound from "./Shared/404.jsx";
import UnderContruction from "./Shared/Underdevelopment.jsx";

const Views = () => {
   return  (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Blog" element={<UnderContruction />} />
      <Route path="/LetsChat" element={<Contact />} />
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
};

export default Views;
