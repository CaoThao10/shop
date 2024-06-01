import React from "react";
import Heading from "../../components/layout/Heading";
import Search from "../../components/Search";
import ListAllItem from "./ListAllItem";
import Footerr from "../../components/layout/Footerr";

const AllPage = () => {
  return (
    <>
      <Heading></Heading>
      <Search url="/all" title="Tất cả sản phẩm"></Search>
      <ListAllItem></ListAllItem>
      <Footerr></Footerr>
    </>
  );
};

export default AllPage;
