import React, { useEffect, useState } from "react";
import { Table, message, DatePicker, Statistic } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import moment from "moment";

const { RangePicker } = DatePicker;

const RevenueManagement = () => {
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dateRange, setDateRange] = useState([
    moment().startOf("month"),
    moment().endOf("month"),
  ]);

  useEffect(() => {
    const fetchRevenues = async () => {
      setLoading(true);
      try {
        const [start, end] = dateRange;
        const querySnapshot = await getDocs(
          query(
            collection(db, "orders"),
            where("createdAt", ">=", start.toDate()),
            where("createdAt", "<=", end.toDate()),
            where("status", "==", "Đã giao")
          )
        );
        const revenuesData = [];
        let total = 0;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          revenuesData.push({ ...data, key: doc.id });
          total += data.totalPrice || 0;
        });
        setRevenues(revenuesData);
        setTotalRevenue(total);
      } catch (error) {
        console.error("Error fetching revenues: ", error);
        message.error("Failed to fetch revenues");
      }
      setLoading(false);
    };

    fetchRevenues();
  }, [dateRange]);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên người đặt",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `${text.toLocaleString()}đ`,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text.seconds * 1000).toLocaleString(),
    },
  ];

  return (
    <div className="flex flex-col w-full h-screen">
      <h2 className="text-2xl font-semibold mb-4">Quản lý doanh thu</h2>
      <div className="mb-4">
        <RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
        />
      </div>
      <div className="mb-4">
        <Statistic
          title="Tổng doanh thu từ các đơn hàng đã giao"
          value={totalRevenue}
          precision={0}
          valueStyle={{ color: "#3f8600" }}
          suffix="đ"
        />
      </div>
      <div className="flex-1 w-full overflow-auto">
        <Table
          columns={columns}
          dataSource={revenues}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default RevenueManagement;
