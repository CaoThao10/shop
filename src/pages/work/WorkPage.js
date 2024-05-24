import React from "react";
import Heading from "../../components/layout/Heading";
import Search from "./Search";
import WorkItem from "./WorkItem";

const WorkPage = () => {
  return (
    <>
      <Heading></Heading>
      <Search></Search>
      <WorkItem></WorkItem>
    </>
  );
};

export default WorkPage;
