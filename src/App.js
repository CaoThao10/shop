import "./App.css";
import { AuthProvider } from "./contexts/auth-context";
import AboutPage from "./pages/about/AboutPage";
import AllColectionPage from "./pages/allColection/AllColectionPage";
import HomePage from "./pages/home/HomePage";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/sign-in/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import WorkPage from "./pages/work/WorkPage";
import DetailPage from "./pages/detail/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/sign-in" element={<SignInPage></SignInPage>} />
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>} />
          <Route path="/work" element={<WorkPage></WorkPage>} />
          <Route path="/detail" element={<DetailPage></DetailPage>} />
          <Route
            path="/all-colection"
            element={<AllColectionPage></AllColectionPage>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
