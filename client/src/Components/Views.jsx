import { Route, Routes  } from "react-router-dom";
import Home from "./Users/Home/Home.jsx";
import About from "./Users/Home/About.jsx";
import Posts from "./Admin/Posts/AllPosts.jsx";
import EditPost from "./Admin/Posts/EditPost.jsx";

import PageNotFound from "./Shared/404.jsx";
import UnderContruction from "./Shared/Underdevelopment.jsx";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Blog" element={<UnderContruction />} />
      <Route path="/About" element={<About />} />
      <Route path="/Posts" element={<Posts />} />
      <Route path="/editPost/:post_id/edit" element={<EditPost  />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Views;
