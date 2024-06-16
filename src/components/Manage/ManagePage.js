import React from "react";
import {
  // AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const ManagePage = () => {
  // const [dataUser, setDataUser] = useState(null);
  const items = [
    getItem(
      "Danh sản phẩm",
      "/manage/danh-sach-san-pham",
      <PieChartOutlined />
    ),

    getItem("Quản lý đơn đặt", "/manage/don-dat", <DesktopOutlined />),
    getItem(
      "Quản lý doanh thu",
      "/manage/quan-ly-doanh-thu",
      <ContainerOutlined />
    ),
  ];
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };

  return (
    <>
      {/* <HeadingAd></HeadingAd> */}
      <div className="text-3xl w-full flex justify-center items-center my-3 text-green-500 font-medium">
        <Link to="/">
          <img
            className="h-[80px] w-[80px] object-cover"
            src="/logo.png"
            alt="Logo"
          />
        </Link>
        <h3 className="">Quản lý Shop</h3>
      </div>
      <div className="content-body w-full">
        <Menu
          className="max-width h-[calc(100vh-60px)] bg-[#ffffff]"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          onClick={onClick}
          items={items}
        />
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default ManagePage;
