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
import Notifications from "./pages/notifications/Notifications";
import Messenger from "./pages/messenger/Messenger";

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
            <Route
              path="/user/:id"
              element={
                <ProtectedRoute>
                  <Profile otherUser={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/friends"
              element={
                <ProtectedRoute>
                  <Friends />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recommended"
              element={
                <ProtectedRoute>
                  <Recommended />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messenger"
              element={
                <ProtectedRoute>
                  <Messenger />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </>
  );
}

export default App;
