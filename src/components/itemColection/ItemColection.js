import React from "react";
import { NavLink } from "react-router-dom";

const ItemColection = ({ url, note, link }) => {
  return (
    <NavLink to={link} className="border h-[380px] w-[280px] rounded-md">
      <div className="h-[320px] w-[280px] group p-1">
        <img
          className="h-[320px] w-[280px] object-cover rounded-md"
          src={url}
          alt=""
        />
      </div>
      <div className="p-1">
        <h3 className="pl-1 font-semibold">Đầm kẻ cổ đức vai trờm đệm vai</h3>
        <h3>
          <strong>Giá :</strong> 500.000
        </h3>
      </div>
    </NavLink>
  );
};

export default ItemColection;
