import React from "react";
import Heading from "../../components/layout/Heading";
import Banner from "./components/Banner";
import Colection from "./components/Colection";
import AoDai from "./components/AoDai";
import Footerr from "../../components/layout/Footerr";

const HomePage = () => {
  return (
    <>
      <Heading></Heading>
      <Banner></Banner>
      <Colection></Colection>
      <AoDai></AoDai>
      <Footerr></Footerr>
    </>
  );
};

export default HomePage;
