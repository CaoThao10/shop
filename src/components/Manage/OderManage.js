import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Space,
  Spin,
  Table,
  Tag,
  TimePicker,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const columns = [
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "nameproduct",
    key: "nameproduct",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Ảnh",
    dataIndex: "img",
    key: "img",
    render: (img) => (
      <img
        className="w-[50px] h-[80px] object-cover rounded-md"
        src={img}
        alt=""
      />
    ),
  },
  {
    title: "Phân loại",
    key: "type",
    dataIndex: "type",
    render: (type) => <span className=" border border-green-200">{type}</span>,
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Số lượng",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Ngày đặt",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a className="text-green-500">
          <EditOutlined />
        </a>
        <a className="text-red-500">
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    nameproduct: "acv",
    price: 32,
    number: 10,
    img: "/dc1.jpeg",
    date: "10/02/2023",
    status: "Đã giao",
    type: "developer",
  },
  {
    key: "2",
    name: "Jim Green",
    img: "/dc3.jpeg",
    nameproduct: "acv",
    price: 42,
    number: 10,
    date: "10/02/2023",
    status: "Đã giao",
    type: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    img: "/dc2.jpeg",
    nameproduct: "acv",
    status: "Đã giao",
    number: 10,
    price: 32,
    date: "10/02/2023",
    type: ["teacher"],
  },
];

const OderManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log("Form values: ", values);
      // Here you can handle form submission, e.g., call an API to save the data
      // After submission, reset form and close modal
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to submit form: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    // Handle file change here
    console.log(e.target.files[0]);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col bg-gray-100 h-[calc(100vh-60px)] w-full p-5">
        <div className="bg-white rounded-lg flex flex-col gap-5 p-5">
          <div className=" w-full h-[50px] items-center flex justify-between">
            <span className="text-2xl">Danh sách đơn đặt hàng</span>
            {/* <div className="flex gap-x-3">
              <input
                className="outline-none px-2 py-1 border rounded-lg border-green-300"
                type="text"
                placeholder="Tìm kiếm"
              />
              <button
                onClick={showModal}
                className="bg-green-600 text-white p-2 font-medium rounded-md hover:bg-green-300"
              >
                Thêm sản phẩm mới
              </button>
            </div> */}
          </div>
          <div className=" w-full">
            <Table columns={columns} pagination={{}} dataSource={data} />
          </div>
        </div>
      </div>
      <div className="modal">
        <Modal
          className="headerModal"
          title="Tạo mới sân"
          open={isModalOpen}
          onCancel={handleCancel}
          width={800}
          footer={[
            <Button key="back" onClick={handleCancel}>
              ĐÓNG
            </Button>,
            <Button
              htmlType="submit"
              type="primary"
              form="form"
              name="form"
              loading={loading}
            >
              {editData ? "Cập nhật" : "Tạo mới"}
            </Button>,
          ]}
        >
          <Spin spinning={loading}>
            <div className="ant_body">
              <Form
                layout="vertical"
                form={form}
                name="form"
                onFinish={onFinish}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên sân" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  {/* <Form.Item label="Địa chỉ" name="address">
                    <Input />
                  </Form.Item> */}
                  <Form.Item label="Số lượng" name="number">
                    <Input />
                  </Form.Item>

                  <Form.Item label="Giá " name="price">
                    <InputNumber className="w-full" />
                  </Form.Item>
                  <Form.Item label="Mô tả" name="description">
                    <TextArea />
                  </Form.Item>
                </div>
                <div className="flex flex-col gap-1 my-4">
                  <Form.Item label="Loại sân" name="type">
                    <Radio.Group defaultValue={7}>
                      <Radio value={1}>Đi tiệc</Radio>
                      <Radio value={2}>Đi làm</Radio>
                      <Radio value={2}>Đi chơi</Radio>
                      {/* <Radio value={2}>Đi làm</Radio>
                      <Radio value={2}>Đi làm</Radio> */}
                    </Radio.Group>
                  </Form.Item>
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />

                {/* {url && (progressPercent === 0 || progressPercent === 100) && (
                <img src={url} alt="" className="w-14 h-14 object-contain" />
              )}
              <Spin
                spinning={
                  progressPercent === 100 || progressPercent === 0
                    ? false
                    : true
                }
              ></Spin> */}
              </Form>
            </div>
          </Spin>
        </Modal>
      </div>
    </div>
  );
};

export default OderManage;
