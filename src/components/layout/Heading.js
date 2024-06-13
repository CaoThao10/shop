import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Heading = () => {
  const [user] = useAuthState(auth);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Đăng xuất thành công!");
      // console.log("thành công");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("Đăng xuất thất bại!");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-[200px] bg-white shadow-md z-50">
      <div className="h-[80px] flex justify-center items-center gap-5">
        <Link to="/">
          <img
            className="h-[80px] w-[80px] object-cover"
            src="/logo.png"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="h-[30px] flex justify-center items-center gap-8 text-[#000] text-lg font-semibold">
        <Link to="/">Trang chủ</Link>
        <Link to="/work">Đồ đi làm</Link>
        <Link to="/party">Đồ đi tiệc</Link>
        <Link to="/play">Đồ đi chơi</Link>
        <Link to="/all">Tất cả sản phẩm</Link>
        <Link to="/manage">Quản lý</Link>
        {!user ? (
          <Link to="/sign-up">Đăng ký</Link>
        ) : (
          <div
            className="relative user-avatar-wrapper"
            onMouseEnter={() => setMenuVisible(true)}
            onMouseLeave={() => setMenuVisible(false)}
          >
            <img
              className="h-[40px] w-[40px] rounded-full object-cover cursor-pointer"
              src="/dl1.jpeg"
              alt="User Avatar"
            />
            {menuVisible && (
              <div
                className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md"
                onMouseEnter={() => setMenuVisible(true)}
                onMouseLeave={() => setMenuVisible(false)}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Thông tin cá nhân
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Heading;
