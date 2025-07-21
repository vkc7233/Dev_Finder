// App.jsx
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./components/content/Body";
import Login from "./components/Auth/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
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
          <Route path="/" element={<Home />} />
          
          <Route path="/landing" element={<LandingPage />} />
     
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            {/*             <Route path="match" element={<Match />} />
             */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Body />
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
