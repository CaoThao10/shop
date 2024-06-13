import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
// import { CartProvider } from "./contexts/CartContext";

import HomePage from "./pages/home/HomePage";
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
// import CartPage from "./pages/cart/CartPage";
import { CartProvider } from "./components/CartContext";
import CartPage from "./pages/CartPage/CartPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/party" element={<PartyPage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/all" element={<AllPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/all-colection" element={<AllNewItem />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/manage" element={<ManagePage />}>
              <Route path="danh-sach-san-pham" element={<ListItem />} />
              <Route path="don-dat" element={<OderManage />} />
              <Route path="quan-ly-doanh-thu" element={<RevenueManagement />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
