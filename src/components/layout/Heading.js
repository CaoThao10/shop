import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Các hàm để lấy giỏ hàng từ localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const Heading = () => {
  const [user] = useAuthState(auth);
  const [menuVisible, setMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const navigate = useNavigate();
  const cartRef = useRef();

  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    setCart(savedCart);

    const handleStorageChange = () => {
      const updatedCart = getCartFromLocalStorage();
      setCart(updatedCart);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef]);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAvatar(userData.avatar || "/default-avatar.png");
        }
      }
    };

    fetchUserAvatar();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Đăng xuất thành công!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("Đăng xuất thất bại!");
    }
  };

  const toggleCartVisible = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-[200px] bg-white shadow-md z-50">
      <div className="h-[80px] flex justify-center items-center gap-5">
        <Link to="/">
          <img
            className="h-[80px] w-[80px] object-cover"
            src="/logo.png"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="h-[30px] flex justify-center items-center gap-8 text-[#000] text-lg font-semibold">
        <Link to="/">Trang chủ</Link>
        <Link to="/work">Đồ đi làm</Link>
        <Link to="/party">Đồ đi tiệc</Link>
        <Link to="/play">Đồ đi chơi</Link>
        <Link to="/all">Tất cả sản phẩm</Link>
        <Link to="/manage">Quản lý</Link>
        {!user ? (
          <Link to="/sign-up">Đăng ký</Link>
        ) : (
          <div className="flex gap-3 items-center">
            <div
              className="relative user-avatar-wrapper"
              onMouseEnter={() => setMenuVisible(true)}
              onMouseLeave={() => setMenuVisible(false)}
            >
              <img
                className="h-[40px] w-[40px] rounded-full object-cover cursor-pointer"
                src={avatar}
                alt="User Avatar"
              />
              {menuVisible && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md"
                  onMouseEnter={() => setMenuVisible(true)}
                  onMouseLeave={() => setMenuVisible(false)}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Thông tin cá nhân
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
            <div className="relative cart-wrapper" ref={cartRef}>
              <svg
                onClick={toggleCartVisible}
                className="cursor-pointer"
                width="30"
                height="30"
                viewBox="0 0 431 304"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 16H80L128 288H384"
                  stroke="black"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M128 224H377.44C379.29 224.001 381.084 223.361 382.515 222.189C383.946 221.016 384.927 219.384 385.29 217.57L414.09 73.57C414.322 72.4089 414.294 71.2106 414.007 70.0617C413.72 68.9128 413.182 67.8419 412.431 66.9264C411.68 66.0108 410.735 65.2734 409.664 64.7673C408.594 64.2612 407.424 63.9992 406.24 64H96"
                  stroke="black"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {cart.length > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-sm">
                  {cart.length}
                </div>
              )}
              {cartVisible && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md cart-dropdown max-h-[300px] overflow-y-auto">
                  {cart.length > 0 ? (
                    cart.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center p-2 border-b border-gray-200"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-12 h-12 object-cover"
                        />
                        <div className="ml-2">
                          <div>{item.name}</div>
                          <div>
                            {item.quantity} x {item.price}đ
                          </div>
                          <div>Kích thước: {item.size}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2">Giỏ hàng trống</div>
                  )}
                  {cart.length > 3 && (
                    <div className="p-2 text-center">
                      <span>... và nhiều sản phẩm khác</span>
                    </div>
                  )}
                  <div className="p-2 text-right">
                    <Link to="/cart" className="text-blue-500">
                      Xem giỏ hàng
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Heading;
