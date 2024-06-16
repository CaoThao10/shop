import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const q = query(collection(db, "orders"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
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
  }, [user]);

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
      render: (text) => <span>{text}</span>,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h2>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OrderList;
