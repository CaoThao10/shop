import React from "react";

const Search = ({ title, url }) => {
  return (
    <div className="mx-[200px] mt-[50px]">
      <div className="flex gap-1 items-center">
        <a href="/"> Trang chủ</a>
        <svg
          width="10"
          height="10"
          viewBox="0 0 22 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.1 0L0 3.1L15.9 19L0 34.9L3.1 38L22 19L3.1 0Z"
            fill="black"
          />
        </svg>
        <a href={url}>{title}</a>
      </div>
      <div className="flex gap-3 w-full justify-center mt-5">
        <input
          className="w-[400px]  outline-none px-2 py-1 border rounded-md"
          type="text"
          placeholder="Nhập sản phẩm bạn muốn tìm"
        />
        <button className=" px-2 rounded-md bg-[#f6c8f1]">Tìm kiếm</button>
      </div>
    </div>
  );
};

export default Search;
