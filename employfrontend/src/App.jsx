import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ManagerInterfaceNavbar from "./common/ManagerInterfaceNavbar";
import RegisterNavbar from "./common/RegiesterNavbar";
import HomeEmployee from "./components/HomeEmployee";
import ResLogin from "./components/RegLogin";

import { SideNavbar } from "./common/SideNavbar";
import ViewProject from "./components/ViewProject";

function App() {
  const getToken = () => localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getToken());
  const checkAuth = useCallback(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  useEffect(() => {
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [checkAuth]);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          <ManagerInterfaceNavbar setIsLoggedIn={setIsLoggedIn} />
          <div className="flex min-h-screen">
            {/* Static Side Navbar */}
            <SideNavbar setIsLoggedIn={setIsLoggedIn} />
            {/* Main content area for routes */}
            <div className="flex-1 bg-gray-100 p-6">
              <Routes>
                <Route path="/home" element={<HomeEmployee />}></Route>,
                <Route path="/viewProject" element={<ViewProject />}></Route>
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <>
          <RegisterNavbar setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route
              path="/"
              element={<ResLogin setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
