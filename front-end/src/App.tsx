import "./App.css";
import Home from "./Home";
import NoPage from "./NoPage";
import SignIn from "./login/Login";
import SignUp from "./login/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "./Nav";
import ClientTable from "./clients/Clients";
import Statistics from "./statistics/Statistics";
import Check from "./checks/Check";
import Banks from "./Banks/Banks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/checks" element={<Check />} />
            <Route path="/clients" element={<ClientTable />} />
            <Route path="/banks" element={<Banks />} />
            <Route
              path="login"
              element={
                <ChakraProvider>
                  <SignIn />
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
