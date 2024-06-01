import React from "react";
import ItemColection from "../../components/itemColection/ItemColection";

const ListItemParty = () => {
  return (
    <div className="mx-[200px] flex gap-3 mt-[50px]">
      <ItemColection
        note="Đầm cup ngực đính nơ tapta"
        price="500.000đ"
        link="/detail"
        url="/dt2.webp"
      ></ItemColection>
      <ItemColection
        note="Đầm cup ngực đính nơ tapta"
        price="500.000đ"
        link="/detail"
        url="/dt4.jpg"
      ></ItemColection>
      <ItemColection
        note="Đầm cup ngực đính nơ tapta"
        price="500.000đ"
        link="/detail"
        url="/dt3.webp"
      ></ItemColection>
    </div>
  );
};

export default ListItemParty;
