import "./App.css";
import Home from "./Home";
import NoPage from "./NoPage";
import ExampleWithProviders from "./checks/Table";
import SignIn from "./login/Login";
import SignUp from "./login/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/checks" element={<ExampleWithProviders />} />
            <Route
              path="login"
              element={
                <ChakraProvider>
                  <SignIn />{" "}
                </ChakraProvider>
              }
            />
            <Route
              path="register"
              element={
                <ChakraProvider>
                  <SignUp />
                </ChakraProvider>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
