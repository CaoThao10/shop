import React, { useEffect, useState } from "react";

import { Button, Flex, Input, Menu, message } from "antd";
import {
  // AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  UserOutlined,
} from "@ant-design/icons";
// import routers from "../../routers";
import { Route, Routes } from "react-router-dom";
// import OrderList from "./OderList";
import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase-app/firebase-auth";
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/cordova";
import { db } from "../../firebase/firebase-config";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const ProfilePage = () => {
  const [current, setCurrent] = useState("thong-tin-ca-nhan");
  const [infoUser, setInfoUser] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    setInfoUser(localStorageData);
  }, []);
  const [changePasswords, setChangePasswords] = useState({});

  const items = [
    getItem("Thông tin cá nhân", "thong-tin-ca-nhan", <UserOutlined />),
    getItem("Quản lý đơn hàng", "quan-ly-don-hang", <ContainerOutlined />),
    getItem("Đổi mật khẩu", "doi-mat-khau", <DesktopOutlined />),
  ];
  const showContentMenu = (routes) => {
    let result = null;
    if (routes) {
      result = routes.map((item, index) => {
        return (
          <Route key={index} path={item.path} element={item.Conponent()} />
        );
      });
    }
    return result;
  };
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const handleSubmit = async () => {
    if (!infoUser?.id)
      return message.error("Vui lòng đăng nhập để cập nhật thông tin");
    if (!infoUser?.name) return message.error("Vui lòng nhập tên");
    if (!infoUser?.email) return message.error("Vui lòng nhập email");

    try {
      setLoading(true);
      const colRef = doc(db, "users", infoUser?.id);
      await updateDoc(colRef, {
        ...infoUser,
      });
      message.success("Cập nhật sân thành công");
    } catch (error) {
      console.log("Error updating document: ", error);
    }
    setLoading(false);
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Xác minh mật khẩu hiện tại
      const user = getAuth().currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Thay đổi mật khẩu mới
      await updatePassword(user, newPassword);

      // Thông báo thành công
      return { success: true, message: "Đổi mật khẩu thành công!" };
    } catch (error) {
      // Xử lý lỗi
      console.error("Error changing password: ", error);
      return {
        success: false,
        message: "Failed to update password: " + error.message,
      };
    }
  };

  const handleSubmitChangePass = async () => {
    if (!changePasswords?.password)
      return message.error("Vui lòng nhập mật khẩu cũ");
    if (!changePasswords?.passwordNew)
      return message.error("Vui lòng nhập mật khẩu mới");
    if (!changePasswords?.rePasswordNew)
      return message.error("Vui lòng nhập lại mật khẩu mới");
    if (changePasswords?.passwordNew !== changePasswords?.rePasswordNew)
      return message.error("Mật khẩu mới không trùng khớp");
    if (!infoUser?.id)
      return message.error("Vui lòng đăng nhập để cập nhật thông tin");

    try {
      setLoading(true);
      const result = await changePassword(
        changePasswords.password,
        changePasswords.passwordNew
      );
      if (result.success) {
        // Thành công
        message.success("Đổi mật khẩu thành công");
      } else {
        // Lỗi
        message.error("Sai mật khẩu cũ!");
      }
    } catch (error) {
      // Xử lý lỗi
      message.error("Sai mật khẩu cũ!");
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="my-5">
        <span className="text-2xl font-semibold text-green-400 mx-[200px] ">
          Thông tin cá nhân
        </span>
      </div>
      <div className="grid grid-cols-4 gap-10 mx-[200px]">
        <div className="col-span-1">
          <div className="">
            <Menu
              // className="max-width"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              onClick={onClick}
              items={items}
            />
            {/* <Routes>{showContentMenu(routers)}</Routes> */}
          </div>
        </div>
        {current === "thong-tin-ca-nhan" ? (
          <div className="col-span-3">
            <div className="grid-cols-2 grid gap-10">
              <div className="flex-col flex w-full gap-y-3">
                <span className="max-w-full">Họ tên</span>
                <input
                  className="border w-full rounded-md outline-none py-1 px-2"
                  type="text"
                  defaultValue={infoUser?.name}
                  onChange={(e) => {
                    setInfoUser({ ...infoUser, name: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col w-full gap-y-3">
                <span className="">Email</span>
                <input
                  className="border w-full rounded-md outline-none py-1 px-2"
                  type="text"
                  defaultValue={infoUser?.email}
                  onChange={(e) => {
                    setInfoUser({ ...infoUser, email: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="grid-cols-2 grid gap-10">
              <div className="flex-col flex w-full gap-y-3">
                <span className="max-w-full">Điện thoại</span>
                <input
                  className="border w-full rounded-md outline-none py-1 px-2"
                  type="text"
                  defaultValue={infoUser?.phone}
                  onChange={(e) => {
                    setInfoUser({ ...infoUser, phone: e.target.value });
                  }}
                />
              </div>
            </div>
            <Button
              type="primary"
              className="mt-4"
              onClick={handleSubmit}
              loading={loading}
            >
              Xác nhận
            </Button>
          </div>
        ) : current === "doi-mat-khau" ? (
          <div className="col-span-3">
            <div className="flex flex-col w-full gap-y-3">
              <span className="">Mật khẩu cũ</span>

              <Input.Password
                placeholder="Nhập mật khẩu cũ"
                onChange={(e) => {
                  setChangePasswords({
                    ...changePasswords,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="col-span-3 mt-4">
              <div className="grid-cols-2 grid gap-10">
                <div className="flex-col flex w-full gap-y-3">
                  <span className="max-w-full">Mật khẩu mới</span>
                  <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    onChange={(e) => {
                      setChangePasswords({
                        ...changePasswords,
                        passwordNew: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col w-full gap-y-3">
                  <span className="">Nhập lại mật khẩu mới</span>
                  <Input.Password
                    placeholder="Nhập lại mật khẩu mới"
                    onChange={(e) => {
                      setChangePasswords({
                        ...changePasswords,
                        rePasswordNew: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <Button
                type="primary"
                className="mt-4"
                onClick={handleSubmitChangePass}
                loading={loading}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        ) : (
          <div className="col-span-3">{/* <OrderList /> */}</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
