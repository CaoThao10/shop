import React from "react";
import ItemColection from "../../components/itemColection/ItemColection";

const ListItemWork = () => {
  return (
    <div>
      <div className="mx-[200px] flex gap-3 mt-[50px]">
        <ItemColection link="/detail" url="/dl1.jpeg"></ItemColection>
        <ItemColection link="/detail" url="/dl4.jpeg"></ItemColection>
        <ItemColection link="/detail" url="/dl3.jpeg"></ItemColection>
      </div>
    </div>
  );
};

export default ListItemWork;
