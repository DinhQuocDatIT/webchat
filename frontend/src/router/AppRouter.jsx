import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "../views/Messages/Messages";
import { Login } from "../views/Auth/Auth";
function AppRouter() {
  return (
    <>
        <Routes>
          <Route path="/messages" element={<Messages/>} />
         <Route path="/login" element ={<Login/>}/>
        </Routes>
    </>
  );
}
export default AppRouter;
