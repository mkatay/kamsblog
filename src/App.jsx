import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/UserContext";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { AddPost } from "./pages/AddPost";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";
import { SignInUp } from "./pages/SignInUp";
//import { SignUp } from "./pages/SignUp";
import { PwReset } from "./pages/PwReset";
import { Navbar } from "./components/Navbar";
import { CategProvider } from "./context/CategContext";
import { ConfirmProvider } from "material-ui-confirm";
import { Profile } from "./pages/Profile";
import { useState } from "react";
import { EditPost } from "./pages/EditPost";

function App() {
  const [avatar,setAvatar]=useState(null)
  return (
    <BrowserRouter>
      <CategProvider>
        <UserProvider>
          <ConfirmProvider>
            <div className="app">
              <Navbar  avatar={avatar} setAvatar={setAvatar}/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/update/:id" element={<EditPost />} />
                <Route path="/create" element={<AddPost />} />
                <Route path="/signinup/:type" element={<SignInUp />} />
               
                <Route path="/pwreset" element={<PwReset />} />
                <Route path="/profile" element={<Profile setAvatar={setAvatar}/>} />
             
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ConfirmProvider>
        </UserProvider>
      </CategProvider>
    </BrowserRouter>
  );
}

export default App;
