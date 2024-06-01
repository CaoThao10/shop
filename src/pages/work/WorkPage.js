import React from "react";
import Heading from "../../components/layout/Heading";
import Search from "../../components/Search";
import ListItemWork from "./ListItemWork";
import Footerr from "../../components/layout/Footerr";

const WorkPage = () => {
  return (
    <>
      <Heading></Heading>
      <Search url="/work" title="Đồ đi làm"></Search>
      <ListItemWork></ListItemWork>
      <Footerr></Footerr>
    </>
  );
};

export default WorkPage;
