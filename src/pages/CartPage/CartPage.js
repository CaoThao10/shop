import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Input, InputNumber, Modal, Form, message } from "antd";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

// Các hàm để lưu và lấy giỏ hàng từ localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    setCart(savedCart);

    const fetchUserInfo = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        }
      }
    };
    fetchUserInfo();
  }, [user]);

  const removeFromCart = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const clearSelectedItems = () => {
    const updatedCart = cart.filter(
      (cartItem) =>
        !selectedItems.some(
          (selectedItem) =>
            selectedItem.id === cartItem.id &&
            selectedItem.size === selectedItem.size
        )
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const getTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSelectItem = (item) => {
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedSelectedItems);
  };

  const handlePlaceOrder = () => {
    if (selectedItems.length > 0) {
      form.setFieldsValue({
        name: userInfo.name || user.displayName || "",
        phone: userInfo.phone || "",
        address: "",
        items: selectedItems.map((item) => ({ quantity: item.quantity })),
        totalPrice: getTotalPrice(selectedItems),
      });
      setIsModalVisible(true);
    } else {
      message.error("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const orderData = {
        uid: user.uid,
        name: values.name,
        phone: values.phone,
        address: values.address,
        items: selectedItems.map((item, index) => ({
          ...item,
          quantity: values.items[index].quantity,
        })),
        totalPrice: values.totalPrice,
        createdAt: new Date(),
        status: "Đang chuẩn bị hàng", // Trạng thái mặc định
      };
      await addDoc(collection(db, "orders"), orderData);
      message.success("Đặt hàng thành công!");
      setIsModalVisible(false);
      clearSelectedItems();
    } catch (error) {
      console.log("Validate Failed:", error);
      message.error("Đặt hàng thất bại, vui lòng thử lại.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="mx-[200px] mt-[100px]">
      <h1 className="text-3xl font-semibold mb-5">Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl mb-3">Giỏ hàng của bạn đang trống</h2>
          <Link to="/all" className="text-blue-500">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 mb-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border border-gray-200 rounded-md"
              >
                <Checkbox
                  onChange={() => handleSelectItem(item)}
                  checked={selectedItems.includes(item)}
                />
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-cover ml-2"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">Kích thước: {item.size}</p>
                  <p className="text-gray-500">Số lượng: {item.quantity}</p>
                  <p className="text-gray-500">
                    Giá: {item.price.toLocaleString()}đ
                  </p>
                  <button
                    className="mt-2 text-red-500"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Xóa
                  </button>
                </div>
                <div className="text-lg font-semibold">
                  {(item.price * item.quantity).toLocaleString()}đ
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-4">
            <h2 className="text-2xl font-semibold">
              Tổng cộng: {getTotalPrice(cart).toLocaleString()}đ
            </h2>
            <div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                onClick={handlePlaceOrder}
              >
                Đặt hàng
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => {
                  setCart([]);
                  saveCartToLocalStorage([]);
                }}
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal
        title="Xác nhận đơn hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="orderForm">
          <Form.Item name="name" label="Tên người đặt">
            <Input disabled />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ nhận hàng"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ nhận hàng" },
            ]}
          >
            <Input />
          </Form.Item>
          {selectedItems.map((item, index) => (
            <Form.Item
              key={item.id}
              label={`${item.name} - Kích thước: ${item.size}`}
              name={["items", index, "quantity"]}
              initialValue={item.quantity}
              rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
            >
              <InputNumber min={1} />
            </Form.Item>
          ))}
          <Form.Item
            name="totalPrice"
            label="Tổng tiền"
            initialValue={getTotalPrice(selectedItems).toLocaleString()}
          >
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CartPage;
