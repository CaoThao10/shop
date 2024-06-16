import React, { useState, useEffect } from "react";
import { Button, Input, Menu, message, Upload } from "antd";
import {
  ContainerOutlined,
  DesktopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import { db, storage } from "../../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import OrderList from "./OrderList";

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
  const [changePasswords, setChangePasswords] = useState({});
  const [avatar, setAvatar] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setInfoUser(userDoc.data());
          setAvatar(userDoc.data().avatar || "");
        } else {
          setInfoUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          });
        }
      }
    };
    fetchUserInfo();
  }, [auth]);

  const items = [
    getItem("Thông tin cá nhân", "thong-tin-ca-nhan", <UserOutlined />),
    getItem("Quản lý đơn hàng", "quan-ly-don-hang", <ContainerOutlined />),
    getItem("Đổi mật khẩu", "doi-mat-khau", <DesktopOutlined />),
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleUpload = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `avatars/${infoUser.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setAvatar(downloadURL);
    setInfoUser({ ...infoUser, avatar: downloadURL });
  };

  const handleSubmit = async () => {
    if (!infoUser?.uid) {
      message.error("Vui lòng đăng nhập để cập nhật thông tin");
      return;
    }
    if (!infoUser?.name || infoUser.name.trim() === "") {
      message.error("Vui lòng nhập tên");
      return;
    }
    if (!infoUser?.email || infoUser.email.trim() === "") {
      message.error("Vui lòng nhập email");
      return;
    }

    try {
      setLoading(true);
      const colRef = doc(db, "users", infoUser?.uid);
      const docSnapshot = await getDoc(colRef);
      if (docSnapshot.exists()) {
        await updateDoc(colRef, {
          ...infoUser,
        });
      } else {
        await setDoc(colRef, {
          ...infoUser,
        });
      }
      message.success("Cập nhật thông tin thành công");
    } catch (error) {
      console.log("Error updating document: ", error);
      message.error("Cập nhật thông tin thất bại");
    }
    setLoading(false);
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      return { success: true, message: "Đổi mật khẩu thành công!" };
    } catch (error) {
      console.error("Error changing password: ", error);
      return {
        success: false,
        message: "Failed to update password: " + error.message,
      };
    }
  };

  const handleSubmitChangePass = async () => {
    if (!changePasswords?.password) {
      message.error("Vui lòng nhập mật khẩu cũ");
      return;
    }
    if (!changePasswords?.passwordNew) {
      message.error("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (!changePasswords?.rePasswordNew) {
      message.error("Vui lòng nhập lại mật khẩu mới");
      return;
    }
    if (changePasswords?.passwordNew !== changePasswords?.rePasswordNew) {
      message.error("Mật khẩu mới không trùng khớp");
      return;
    }
    if (!infoUser?.uid) {
      message.error("Vui lòng đăng nhập để cập nhật thông tin");
      return;
    }

    try {
      setLoading(true);
      const result = await changePassword(
        changePasswords.password,
        changePasswords.passwordNew
      );
      if (result.success) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error("Sai mật khẩu cũ!");
    }
    setLoading(false);
  };

  return (
    <div className="mx-[200px]">
      <div className="my-5 flex flex-col items-center w-[250px] gap-5">
        <span className="text-2xl font-semibold text-green-400 flex items-center gap-3 ">
          <a className="text-green-400" href="/">
            <svg
              width="11"
              height="15"
              viewBox="0 0 11 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 9L9 18L10.4 16.5L3 9L10.4 1.5L9 0L0 9Z"
                fill="#4ade80"
              />
            </svg>
          </a>
          Thông tin cá nhân
        </span>
        <div className="rounded-full overflow-hidden h-[100px] w-[100px]">
          <img src={avatar || "/default-avatar.png"} alt="Avatar" />
        </div>
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            handleUpload(file);
            return false;
          }}
        >
          <Button>Thay đổi ảnh đại diện</Button>
        </Upload>
      </div>
      <div className="grid grid-cols-4 gap-10 ">
        <div className="col-span-1">
          <div className="">
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              onClick={onClick}
              items={items}
            />
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
                  value={infoUser?.name || ""}
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
                  value={infoUser?.email || ""}
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
                  value={infoUser?.phone || ""}
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
          <div className="col-span-3">
            <OrderList />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
