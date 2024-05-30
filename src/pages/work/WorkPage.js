import React from "react";
import Heading from "../../components/layout/Heading";
import Search from "../../components/Search";
import ListItemWork from "./ListItemWork";

const WorkPage = () => {
  return (
    <>
      <Heading></Heading>
      <Search title="Đồ đi làm"></Search>
      <ListItemWork></ListItemWork>
    </>
  );
};

export default WorkPage;
