import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AppContainer from "./components/appContainer/AppContainer";
import Friends from "./pages/friends/Friends";
import Settings from "./pages/settings/Settings";
import Recommended from "./pages/recommended/Recommended";

function App() {
  return (
    <>
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/user/:id" element={<Profile otherUser={true} />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/recommended" element={<Recommended />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </>
  );
}

export default App;
