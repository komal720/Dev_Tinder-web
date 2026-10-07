import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./components/Body";
import Login from "./components/login";
import Profile from "./components/profile";
import Feed from "./components/feed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;