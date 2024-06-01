import "./App.css";
import { AuthProvider } from "./contexts/auth-context";

import AllColectionPage from "./pages/allColection/AllColectionPage";
import HomePage from "./pages/home/HomePage";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/sign-in/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import WorkPage from "./pages/work/WorkPage";
import DetailPage from "./pages/detail/DetailPage";
import PartyPage from "./pages/party/PartyPage";
import PlayPage from "./pages/play/PlayPage";
import AllPage from "./pages/all/AllPage";
import AllNewItem from "./pages/allColection/AllNewItem";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/sign-in" element={<SignInPage></SignInPage>} />
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>} />
          <Route path="/work" element={<WorkPage></WorkPage>} />
          <Route path="/party" element={<PartyPage></PartyPage>} />
          <Route path="/play" element={<PlayPage></PlayPage>} />
          <Route path="/all" element={<AllPage></AllPage>} />
          <Route path="/detail" element={<DetailPage></DetailPage>} />
          <Route
            path="/all-colection"
            element={<AllColectionPage></AllColectionPage>}
          />
          <Route path="/all-new" element={<AllNewItem></AllNewItem>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
