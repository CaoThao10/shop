import React, { useState, useEffect } from "react";
import { Rate, Radio, InputNumber, Collapse } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Các hàm để lưu và lấy giỏ hàng từ localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("storage")); // Thông báo thay đổi
};

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const DetailItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("No ID provided in the URL.");
        return;
      }

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const onChangeKey = (key) => {
    console.log(key);
  };

  const onChangeSize = (e) => {
    setSize(e.target.value);
  };

  const onChangeNum = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      const newItem = {
        id,
        name: product.name,
        img: product.img,
        price: product.price,
        size,
        quantity,
      };

      const existingItemIndex = cart.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
      } else {
        updatedCart = [...cart, newItem];
      }

      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
      toast.success("Thêm vào giỏ hàng thành công!");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const items = [
    {
      key: "1",
      label: "Thông tin chi tiết",
      children: <p>{product.description}</p>,
    },
    {
      key: "2",
      label: "Bài viết chi tiết",
      children: <p>Không có</p>,
    },
  ];

  return (
    <div className="mx-[200px] mt-[100px]">
      <ToastContainer />
      <div className="my-10">
        <a className="flex items-center" href="/">
          <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 10L13 19L14.4 17.5L7 10L14.4 2.5L13 1L4 10Z"
              fill="black"
            />
          </svg>
          {product.name}
        </a>
      </div>
      <div className="flex gap-5">
        <div className="w-[500px] h-[400px]">
          <img src={product.img} alt={product.name} />
        </div>
        <div className="flex flex-col gap-3 w-[600px]">
          <h3>{product.name}</h3>
          <Rate disabled defaultValue={5} />
          <h3>Giá: {product.price.toLocaleString()}đ</h3>
          <svg
            width="300"
            height="2"
            viewBox="0 0 2195 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="1" x2="2195" y2="1" stroke="black" strokeWidth="2" />
          </svg>

          <div className="flex gap-3 items-center">
            <h3>Kích thước:</h3>
            <Radio.Group onChange={onChangeSize} value={size}>
              <Radio value="S">S</Radio>
              <Radio value="M">M</Radio>
              <Radio value="L">L</Radio>
              <Radio value="XL">XL</Radio>
            </Radio.Group>
          </div>
          <div className="flex gap-3 items-center">
            <h3>Số lượng:</h3>
            <InputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={onChangeNum}
            />
          </div>
          <div className="flex gap-3">
            <HeartOutlined />
            <button
              className="px-2 py-1 bg-[#fdc8f7] rounded-lg"
              onClick={handleAddToCart}
            >
              Thêm giỏ hàng
            </button>
          </div>
          <Collapse
            items={items}
            defaultActiveKey={["1"]}
            onChange={onChangeKey}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
