import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { history } from "./history";
import RouterGuard from "./RouterGuard";

const App = () => {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route
          path="/dashboard"
          element={<RouterGuard component={Dashboard} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
