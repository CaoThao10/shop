import React from "react";
import Heading from "../../components/layout/Heading";
import Search from "../../components/Search";

import ListItemParty from "./ListItemParty";

const PartyPage = () => {
  return (
    <>
      <Heading></Heading>
      <Search title="Đồ đi tiệc"></Search>
      <ListItemParty></ListItemParty>
    </>
  );
};

export default PartyPage;
