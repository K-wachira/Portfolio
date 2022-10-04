import { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Users/Home/Home.jsx";
import Contact from "./Users/Home/Contact.jsx";
import Posts from "./Admin/Posts/index.jsx";
import EditPost from "./Admin/Posts/edit.jsx";

import PageNotFound from "./Shared/404.jsx";
import UnderContruction from "./Shared/Underdevelopment.jsx";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Blog" element={<UnderContruction />} />
      <Route path="/LetsChat" element={<Contact />} />
      <Route path="/Posts" element={<Posts />} />
      <Route path="/editPost/:post_id" element={<EditPost  />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Views;
