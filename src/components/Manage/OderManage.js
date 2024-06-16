import React, { useEffect, useState } from "react";
import { Table, message, Select } from "antd";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const { Option } = Select;

const OderManage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersData = [];
        querySnapshot.forEach((doc) => {
          ordersData.push({ ...doc.data(), key: doc.id });
        });
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        message.error("Failed to fetch orders");
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, value) => {
    setLoading(true);
    try {
      const orderDoc = doc(db, "orders", orderId);
      await updateDoc(orderDoc, { status: value });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.key === orderId ? { ...order, status: value } : order
        )
      );
      message.success("Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      console.error("Error updating order status: ", error);
      message.error("Failed to update order status");
    }
    setLoading(false);
  };

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
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          className="w-[200px]"
          value={text}
          onChange={(value) => handleStatusChange(record.key, value)}
        >
          <Option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</Option>
          <Option value="Đang giao">Đang giao</Option>
          <Option value="Đã giao">Đã giao</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full h-screen">
      <h2 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h2>
      <div className="flex-1 w-full overflow-auto">
        <Table
          columns={columns}
          dataSource={orders}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default OderManage;
