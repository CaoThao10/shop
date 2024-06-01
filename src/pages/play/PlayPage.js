import React from "react";
import Heading from "../../components/layout/Heading";
import Search from "../../components/Search";
import ListItemPlay from "./ListItemPlay";
import Footerr from "../../components/layout/Footerr";

const PlayPage = () => {
  return (
    <>
      <Heading></Heading>
      <Search url="/play" title="Đồ đi chơi"></Search>
      <ListItemPlay></ListItemPlay>
      <Footerr></Footerr>
    </>
  );
};

export default PlayPage;
