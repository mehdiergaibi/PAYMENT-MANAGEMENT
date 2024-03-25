import "./App.css";
import Home from "./Home";
import NoPage from "./NoPage";
import ExampleWithProviders from "./checks/Table";
import SignIn from "./login/Login";
import SignUp from "./login/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="checks" element={<ExampleWithProviders />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
