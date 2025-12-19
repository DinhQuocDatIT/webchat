import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "../views/Messages/Messages";

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/messages" element={<Messages/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default AppRouter;
