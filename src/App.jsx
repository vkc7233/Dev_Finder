// App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Body from './components/content/Body';
import Login from './components/Auth/Login';
//import Register from './components/Register';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import Match from './pages/Match';
import Home from './pages/Home';
import PrivateRoute from './components/Auth/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Auth/Signup';
import Explore from './pages/Explore';
import ProfileCard from './components/ProfileCard';

const App = () => {
  return (
          <AuthProvider>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
{/*             <Route path="match" element={<Match />} />
 */}
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
              
            </Route>
          </Routes>
      </AuthProvider>

  );
};

export default App;
