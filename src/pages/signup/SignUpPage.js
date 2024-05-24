import React from "react";

const SignUpPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-[100px]">
      <div>
        <a href="/">
          <img className="w-[150px]" src="/logo.png" alt="" />
        </a>
      </div>
      <div>
        <form action="">
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
              <label className="font-medium" htmlFor="name">
                Email
              </label>
              <input
                className="border p-1 outline-none rounded-md"
                type="text"
                name="email"
                id="email"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-medium" htmlFor="name">
                Mật khẩu
              </label>
              <input
                className="border p-1 outline-none rounded-md"
                type="text"
                name="pass"
                id="pass"
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
            <div className="flex gap-1 ">
              <span>Bạn đã có tài khoản?</span>
              <a className="text-[#f74ce6]" href="/sign-in">
                Đăng nhập
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
