// App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Body from './components/content/Body';
import Login from './components/Auth/Login';
//import Register from './components/Register';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Match from './pages/Match';
import Home from './pages/Home';
import PrivateRoute from './components/Auth/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Auth/Signup';
import Explore from './pages/Explore';

const App = () => {
  return (
    <Provider store={appStore}>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Signup />} />

              <Route
                path="feed"
                element={
                  <PrivateRoute>
                    <Feed />
                  </PrivateRoute>
                }
              />
             < Route
                path="explore"
                element={
                  <PrivateRoute>
                    <Explore />
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
                path="match"
                element={
                  <PrivateRoute>
                    <Match />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
      </AuthProvider>
    </Provider>
  );
};

export default App;
