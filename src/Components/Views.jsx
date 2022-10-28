import { Route, Routes } from "react-router-dom";
// Portfolio imports
import Home from "./Users/Home/Home.jsx";
import About from "./Users/Home/About.jsx";
// Admin Blog Imports
import Posts from "./Admin/Posts/AllPosts.jsx";
import EditPost from "./Admin/Posts/EditPost.jsx";
// User Facing Imports
import BlogPosts from "./Users/Blog/BlogPosts.jsx";
import BlogPost from "./Users/Blog/Blog.Post.jsx";

// Global pages
import PageNotFound from "./Shared/404.jsx";
import UnderContruction from "./Shared/Underdevelopment.jsx";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/UnderDev" element={<UnderContruction />} />
      <Route path="/About" element={<About />} />
      <Route path="/Posts" element={<Posts />} />
      <Route path="/editPost/:post_id/edit" element={<EditPost />} />
      <Route path="/editPost/:post_id/view" element={<BlogPost />} />

      {/* User Facing routes */}
      <Route path="/Blog" element={<BlogPosts />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Views;
