import React, { useState } from "react";
import { Carousel } from "antd";
import { Rate } from "antd";
import { Radio } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import { Collapse } from "antd";

const items = [
  {
    key: "1",
    label: "Thông tin chi tiết",
    children: (
      <p>
        - CHẤT LIỆU: KATE thuộc nhóm những loại vải tổng hợp. Là sự kết hợp giữa
        những sợi bông trên vải tự nhiên cotton và sợi polyester nhân tạo. -
        TÍNH CHẤT: Khả năng thấm hút tốt, vải không bi nhăn, mặt vải phẳng và
        mịn với tính chất này việc giặt ủi trở nên đơn giản và dễ dàng hơn
        nhiều. <br /> - CÁCH GIẶT VÀ BẢO QUẢN: Lật mặt trong của sản phẩm ra
        trước khi giặt. Khi phơi nên chọn chỗ thoáng khí có nhiều gió tránh ánh
        nắng trực tiếp chiếu vào. Không nên sử dụng các chất tẩy rửa mạnh để
        giặt sản phẩm cũng như không nên đổ trực tiếp vào sản phẩm.
      </p>
    ),
  },
  {
    key: "2",
    label: "Bài viết chi tiết",
    children: <p>Không có</p>,
  },
  {
    key: "3",
    label: "Bảng size",
    children: (
      <p>
        <img src="/size.jpg" alt="" />
      </p>
    ),
  },
];
const onChangeNum = (value) => {
  console.log("changed", value);
};
const contentStyle = {
  margin: 0,
  height: "600px",
  color: "#0000",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const DetailItem = () => {
  const onChangeKey = (key) => {
    console.log(key);
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="mx-[200px] mt-[50px] flex gap-5">
      <div className="w-[500px] h-[400px]">
        <Carousel arrows infinite={false}>
          <div>
            <h3 style={contentStyle}>
              <img src="dl1.jpeg" alt="" />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img src="dl1-2.jpeg" alt="" />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img src="dl1-3.jpeg" alt="" />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img src="dl1-4.jpeg" alt="" />
            </h3>
          </div>
        </Carousel>
      </div>
      <div className="flex flex-col gap-3 w-[600px]">
        <h3>Chân váy vặn xẻ lưới</h3>
        <Rate disabled defaultValue={5} />
        <h3>Giá: 500.000đ</h3>
        <svg
          width="300"
          height="2"
          viewBox="0 0 2195 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line y1="1" x2="2195" y2="1" stroke="black" stroke-width="2" />
        </svg>
        <div className="flex gap-3  items-center">
          <h3>Màu sắc:</h3>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Trắng</Radio>
            <Radio value={2}>Đen</Radio>
            <Radio value={3}>Nâu</Radio>
          </Radio.Group>
        </div>
        <div className="flex gap-3  items-center">
          <h3>Kích thước:</h3>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>S</Radio>
            <Radio value={2}>M</Radio>
            <Radio value={3}>L</Radio>
            <Radio value={4}>XL</Radio>
          </Radio.Group>
        </div>
        <div className="flex gap-3  items-center">
          <h3>Số lượng:</h3>
          <InputNumber
            min={1}
            max={10}
            defaultValue={3}
            onChange={onChangeNum}
          />
        </div>
        <div className="flex gap-3">
          <HeartOutlined />
          <button className=" px-2 py-1 bg-[#fdc8f7] rounded-lg">
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
  );
};

export default DetailItem;
