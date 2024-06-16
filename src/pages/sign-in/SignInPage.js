import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Email không hợp lệ.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Cập nhật tên người dùng trong Firebase Authentication
      await updateProfile(user, {
        displayName: fullName,
      });

      // Lưu thông tin người dùng vào Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
      });

      toast.success("Đăng ký thành công!");

      // Chờ 2 giây trước khi điều hướng
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error signing up: ", error);
      toast.error(error.message);
    }
    setIsLoading(false);
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
              <label className="font-medium" htmlFor="fullName">
                Họ tên
              </label>
              <input
                className="border p-1 outline-none rounded-md"
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ tên của bạn"
                required
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
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                required
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
                required
              />
            </div>
            <div className="flex gap-3 mt-2">
              <button
                className={`bg-[#fdb1f6] p-1 rounded-md w-full font-medium ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng ký..." : "Đăng ký"}
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
