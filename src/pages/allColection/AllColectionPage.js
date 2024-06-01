import React from "react";
import Heading from "../../components/layout/Heading";

import ItemColection from "../../components/itemColection/ItemColection";
import Search from "../../components/Search";

const AllColectionPage = () => {
  return (
    <div>
      <Heading></Heading>
      {/* <Colection></Colection> */}
      <Search url="/all-colection" title="Tất cả bộ sưu tập"></Search>
      <div className="grid grid-cols-4 gap-5 mt-10 h-72 mx-[200px]">
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dc1.jpeg"
        />
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dt2.webp"
        />
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dt3.webp"
        />
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dc3.jpeg"
        />
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dc1.jpeg"
        />
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dt2.webp"
        />
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dt3.webp"
        />
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dc3.jpeg"
        />
      </div>
    </div>
  );
};

export default AllColectionPage;
