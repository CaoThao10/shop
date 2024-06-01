import React from "react";
import ItemColection from "../../components/itemColection/ItemColection";

const ListItemWork = () => {
  return (
    <div>
      <div className="mx-[200px] flex gap-3 mt-[50px]">
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dl1.jpeg"
        ></ItemColection>
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dl4.jpeg"
        ></ItemColection>
        <ItemColection
          link="/detail"
          note="Đầm cup ngực đính nơ tapta"
          price="500.000đ"
          url="/dl3.jpeg"
        ></ItemColection>
      </div>
    </div>
  );
};

export default ListItemWork;
