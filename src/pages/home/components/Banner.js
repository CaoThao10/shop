import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  height: "550px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Banner = () => {
  return (
    <div className=" mx-[200px] mt-2 ">
      <Carousel autoplay>
        <div className="w-full h-full">
          <h3 style={contentStyle}>
            <img
              className="object-cover h-full w-full"
              src="./bn1.jpg"
              alt=""
            />
          </h3>
        </div>
        <div className="w-full h-full">
          <h3 style={contentStyle}>
            <img
              className="object-cover h-full w-full"
              src="./bn2.jpg"
              alt=""
            />
          </h3>
        </div>
        <div className="w-full h-full">
          <h3 style={contentStyle}>
            <img
              className="object-cover h-full w-full"
              src="./bn3.jpg"
              alt=""
            />
          </h3>
        </div>
        <div className="w-full h-full">
          <h3 style={contentStyle}>
            <img
              className="object-cover h-full w-full"
              src="./bn4.jpg"
              alt=""
            />
          </h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
