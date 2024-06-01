import React from "react";
import ItemColection from "../../components/itemColection/ItemColection";

const ListAllItem = () => {
  return (
    <div className="mx-[200px] grid grid-cols-4 gap-3 mt-[50px]">
      <ItemColection
        note="Đầm cup ngực đính nơ tapta"
        price="500.000đ"
        link="/detail"
        url="/dc1.jpeg"
      ></ItemColection>
      <ItemColection
        note="Đầm cup ngực đính nơ tapta"
        price="500.000đ"
        link="/detail"
        url="/dc1.jpeg"
      ></ItemColection>
      <ItemColection
        note="Đầm cup ngực đính nơ tapta"
        price="500.000đ"
        link="/detail"
        url="/dc1.jpeg"
      ></ItemColection>
      <ItemColection
        note="Đầm cup ngực đính nơ tapta"
        price="500.000đ"
        link="/detail"
        url="/dc2.jpeg"
      ></ItemColection>
      <ItemColection
        note="Đầm cup ngực đính nơ tapta"
        price="500.000đ"
        link="/detail"
        url="/dc3.jpeg"
      ></ItemColection>
      <ItemColection
        note="Đầm cup ngực đính nơ tapta"
        price="500.000đ"
        link="/detail"
        url="/dc1.jpeg"
      ></ItemColection>
    </div>
  );
};

export default ListAllItem;
