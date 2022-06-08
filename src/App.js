import React, { useState, useEffect } from "react";

import Login from "./Screens/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Screens/Home";
const getToken = () => {
  const loggedInUser = localStorage.getItem("info");
  return loggedInUser
}

const ProtectedRoute = ({ children }) => {
  const Token = getToken()
  if (Token == null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
const LoginProtectedRoute = ({ children }) => {
  const Token = getToken()
  if (Token != null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }

};
function App() {

  return (
    <div>
      {<BrowserRouter>
        <Routes>
          <Route>
            <Route index path={"/login"} element={<LoginProtectedRoute><Login /></LoginProtectedRoute>} />
            <Route path={"/"} element={<ProtectedRoute><Home /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>}
    </div>

  );
}

export default App;
