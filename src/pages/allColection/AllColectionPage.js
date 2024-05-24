import React from "react";
import Heading from "../../components/layout/Heading";
import Colection from "../home/components/Colection";
import ItemColection from "../../components/itemColection/ItemColection";

const AllColectionPage = () => {
  return (
    <div>
      <Heading></Heading>
      {/* <Colection></Colection> */}

      <div className="grid grid-cols-4 gap-5 mt-10 h-72 mx-[200px]">
        <ItemColection url="/dc1.jpeg" />
        <ItemColection url="/dt2.webp" />
        <ItemColection url="/dt3.webp" />
        <ItemColection url="/dc3.jpeg" />
        <ItemColection url="/dc1.jpeg" />
        <ItemColection url="/dt2.webp" />
        <ItemColection url="/dt3.webp" />
        <ItemColection url="/dc3.jpeg" />
      </div>
    </div>
  );
};

export default AllColectionPage;
