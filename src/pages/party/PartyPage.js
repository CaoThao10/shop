import React from "react";
import Heading from "../../components/layout/Heading";
import Search from "../../components/Search";

import ListItemParty from "./ListItemParty";
import Footerr from "../../components/layout/Footerr";

const PartyPage = () => {
  return (
    <>
      <Heading></Heading>
      <Search url="/party" title="Đồ đi tiệc"></Search>
      <ListItemParty></ListItemParty>
      <Footerr></Footerr>
    </>
  );
};

export default PartyPage;
