import React from "react";
import { Table } from "antd";

const RevenueManagement = () => {
  const columns = [
    {
      title: "Doanh thu ngày",
      dataIndex: "date",
      key: "date",
      render: (createdId) => <span className="font-semibold">{createdId}</span>,
    },

    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total",
      key: "total ",
      render: (total) => (
        <span className="font-semibold">{total.toLocaleString()}</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col bg-gray-100 h-[calc(100vh-60px)] w-full p-5 ">
        <div className=" bg-white w-full h-[50px] p-10 items-center rounded-lg flex justify-between">
          <span className="text-xl font-medium text-green-600">
            Quản lý doanh thu
          </span>
        </div>
        <div className=" w-full">
          <Table
            columns={columns}
            // dataSource={dataSource}
            scroll={{ x: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueManagement;
