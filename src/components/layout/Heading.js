import React from "react";
import { Link } from "react-router-dom";

const Heading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-[200px] bg-white shadow-md z-50">
      <div className="h-[80px] flex justify-center items-center gap-5">
        <Link to="/">
          <img
            className="h-[80px] w-[80px] object-cover"
            src="/logo.png"
            alt=""
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
        <Link to="/sign-up">Đăng ký</Link>
      </div>
    </div>
  );
};

export default Heading;
