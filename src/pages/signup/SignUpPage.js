import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook dùng để điều hướng

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User created successfully!");

      // Chờ 2 giây trước khi điều hướng
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error signing up: ", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-[100px]">
      <div>
        <a href="/">
          <img className="w-[150px]" src="/logo.png" alt="Logo" />
        </a>
      </div>
      <div>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col gap-5 w-[350px]">
            <div className="flex flex-col gap-3">
              <label className="font-medium" htmlFor="name">
                Họ tên
              </label>
              <input
                className="border p-1 outline-none rounded-md"
                type="text"
                name="name"
                id="name"
                placeholder="Nhập họ tên của bạn"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-medium" htmlFor="email">
                Email
              </label>
              <input
                className="border p-1 outline-none rounded-md"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-medium" htmlFor="password">
                Mật khẩu
              </label>
              <input
                className="border p-1 outline-none rounded-md"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>
            <div className="flex gap-3 mt-2">
              <button
                className="bg-[#fdb1f6] p-1 rounded-md w-full font-medium"
                type="submit"
              >
                Đăng ký
              </button>
            </div>
            <div className="flex gap-1">
              <span>Bạn đã có tài khoản?</span>
              <a className="text-[#f74ce6]" href="/sign-in">
                Đăng nhập
              </a>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
