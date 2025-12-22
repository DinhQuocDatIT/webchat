import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "../views/Messages/Messages";
import { Login, Register } from "../views/Auth/Auth";
import ProtectedRoute from "./ProtectedRoute";
function AppRouter() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/messages" element={<Messages />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}
export default AppRouter;
