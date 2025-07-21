// App.jsx
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./components/content/Body";
import Login from "./components/Auth/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Match from "./pages/Match";
import Home from "./pages/Home";
import PrivateRoute from "./components/Auth/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./components/Auth/Signup";
import Explore from "./pages/Explore";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Navigate to="/home" replace />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            {/*             <Route path="match" element={<Match />} />
             */}
            <Route
              path="home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="feed"
              element={
                <PrivateRoute>
                  <Feed />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="settings"
              element={
                <PrivateRoute>
                  <Setting />
                </PrivateRoute>
              }
            />
            <Route
              path="explore"
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />

            {/* Optional: Add a 404 fallback */}
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
