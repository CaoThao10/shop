import React from "react";
import ItemColection from "../../components/itemColection/ItemColection";

const ListItemParty = () => {
  return (
    <div className="mx-[200px] flex gap-3 mt-[50px]">
      <ItemColection link="/detail" url="/dt2.webp"></ItemColection>
      <ItemColection link="/detail" url="/dt4.jpg"></ItemColection>
      <ItemColection link="/detail" url="/dt3.webp"></ItemColection>
    </div>
  );
};

export default ListItemParty;
