import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebase-config";
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
  Upload,
  Checkbox,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const { confirm } = Modal;

const ListItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), key: doc.id });
    });
    setData(products);
  };

  const handleEdit = (record) => {
    setEditData(record);
    form.setFieldsValue({
      ...record,
      img: record.img
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: record.img,
            },
          ]
        : [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (key) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "products", key));
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product: ", error);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (key) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        handleDelete(key);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditData(null);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let imgURL = editData?.img || "";

      if (values.img && values.img.fileList && values.img.fileList.length > 0) {
        const file = values.img.fileList[0].originFileObj;
        const imgRef = ref(storage, `images/${file.name}`);
        await uploadBytes(imgRef, file);
        imgURL = await getDownloadURL(imgRef);
        console.log("File uploaded successfully. URL:", imgURL);
      }

      const productData = {
        ...values,
        img: imgURL,
        createdAt: new Date(), // Add createdAt field
      };

      if (editData) {
        await updateDoc(doc(db, "products", editData.key), productData);
      } else {
        await addDoc(collection(db, "products"), productData);
      }

      setIsModalOpen(false);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      console.error("Failed to submit form: ", error);
    } finally {
      setLoading(false);
      setEditData(null);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <img
          className="w-[50px] h-[80px] object-cover rounded-md"
          src={img}
          alt="product"
        />
      ),
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Phân loại",
      key: "type",
      dataIndex: "type",
      render: (type) => <span className="border border-green-200">{type}</span>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) =>
        Array.isArray(size) ? size.join(", ") : "Không xác định",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <p className="text-green-500" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </p>
          <p
            className="text-red-500"
            onClick={() => showDeleteConfirm(record.key)}
          >
            <DeleteOutlined />
          </p>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col bg-gray-100 h-[calc(100vh-60px)] w-full p-5">
        <div className="bg-white rounded-lg flex flex-col gap-5 p-5">
          <div className="w-full h-[50px] items-center flex justify-between">
            <span className="text-2xl">Danh sách sản phẩm</span>
            <div className="flex gap-x-3">
              <input
                className="outline-none px-2 py-1 border rounded-lg border-green-300"
                type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
                onClick={showModal}
                className="bg-green-600 text-white p-2 font-medium rounded-md hover:bg-green-300"
              >
                Thêm sản phẩm mới
              </button>
            </div>
          </div>
          <div className="w-full">
            <Table
              columns={columns}
              pagination={{}}
              dataSource={filteredData}
            />
          </div>
        </div>
      </div>
      <div className="modal">
        <Modal
          className="headerModal"
          title={editData ? "Cập nhật sản phẩm" : "Tạo mới sản phẩm"}
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
              key="submit"
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
                id="form"
                name="form"
                onFinish={onFinish}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên sản phẩm" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Số lượng" name="number">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Giá" name="price">
                    <InputNumber className="w-full" />
                  </Form.Item>
                  <Form.Item label="Mô tả" name="description">
                    <TextArea />
                  </Form.Item>
                </div>
                <div className="flex flex-col gap-1 my-4">
                  <Form.Item label="Loại" name="type">
                    <Radio.Group>
                      <Radio value="Đi tiệc">Đi tiệc</Radio>
                      <Radio value="Đi làm">Đi làm</Radio>
                      <Radio value="Đi chơi">Đi chơi</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <Form.Item
                  label="Size"
                  name="size"
                  rules={[{ required: true, message: "Vui lòng chọn kích cỡ" }]}
                >
                  <Checkbox.Group options={["S", "M", "L", "XL"]} />
                </Form.Item>
                <Form.Item
                  label="Hình ảnh"
                  name="img"
                  valuePropName="fileList"
                  getValueFromEvent={(e) =>
                    Array.isArray(e) ? e : e && e.fileList
                  }
                >
                  <Upload
                    listType="picture"
                    beforeUpload={() => false} // Prevent auto upload
                    maxCount={1}
                  >
                    <Button>Chọn hình ảnh</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </div>
          </Spin>
        </Modal>
      </div>
    </div>
  );
};

export default ListItem;
