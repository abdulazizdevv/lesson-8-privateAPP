import { Route, Routes } from "react-router-dom";
import { PrivateHeader } from "../components/PrivateHeader/PrivateHeader";
import { PrivateHome } from "../pages/PrivateHome/PrivateHome";
import { Users } from "../pages/Users/Users";
import { Posts } from "../pages/Posts/Posts";

export const Private = () => {
  return (
    <div>
      <PrivateHeader />
      <div>
        <div className="container">
          <Routes>
            <Route index path="/" element={<PrivateHome />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<h2>Not Founded</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
