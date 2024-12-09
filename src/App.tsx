import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import UserList from "./pages/usersList/UsersList";
import UserDetail from "./pages/userDetail/UserDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const logOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="container m-auto px-3" style={{ minHeight: "100vh" }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <UserList /> : <Navigate to="/" />}
          />
          <Route
            path="/user/:id"
            element={isAuthenticated ? <UserDetail /> : <Navigate to="/" />}
          />
        </Routes>
        {isAuthenticated && (
          <button
            onClick={logOut}
            className="fixed bottom-3 left-4 rounded-sm bg-red-500 py-1 px-3 text-white"
          >
            Logout
          </button>
        )}
      </Router>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default App;
