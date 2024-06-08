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
import ManagePage from "./components/Manage/ManagePage";
import ListItem from "./components/Manage/ListItem";
import OderManage from "./components/Manage/OderManage";
import RevenueManagement from "./components/Manage/RevenueManagement";
import ProfilePage from "./pages/profile/ProfilePage";

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
          <Route path="/profile" element={<ProfilePage></ProfilePage>} />
          {/* <Route path="/manage" element={<ManagePage></ManagePage>} /> */}
          <Route path="/detail" element={<DetailPage></DetailPage>} />
          <Route
            path="/all-colection"
            element={<AllColectionPage></AllColectionPage>}
          />
          <Route path="/all-new" element={<AllNewItem></AllNewItem>} />

          <Route path="/manage" element={<ManagePage />}>
            <Route path="danh-sach-san-pham" element={<ListItem />} />
            <Route path="don-dat" element={<OderManage />} />
            <Route path="quan-ly-doanh-thu" element={<RevenueManagement />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
