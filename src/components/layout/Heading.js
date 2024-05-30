import React from "react";
import { Link } from "react-router-dom";

const Heading = () => {
  return (
    <div className="flex justify-between items-center px-[200px]">
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
        <Link to="/about">Đồ đi chơi</Link>
        <Link to="/about">Tất cả sản phẩm</Link>
        <Link to="/about">Liên hệ</Link>
        <Link to="/sign-up">Đăng ký</Link>
      </div>
    </div>
  );
};

export default Heading;
