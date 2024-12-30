import { Button, Space, Table, Modal, Input, Form } from "antd";
import Header from "../Header/Header";
import { useState } from "react";
import "./Products.scss"; // Import file SCSS

const Products = () => {
  const [categories, setCategories] = useState([
    {
      key: "1",
      image: "https://via.placeholder.com/50",
      name: "Áo Polo",
      price: "180.000",
      category: "Nam",
    },
    {
      key: "2",
      image: "https://via.placeholder.com/50",
      name: "Áo Polo 2",
      price: "200.000",
      category: "Nữ",
    },
    {
      key: "3",
      image: "https://via.placeholder.com/50",
      name: "Áo Polo 3",
      price: "220.000",
      category: "Trẻ em",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: "",
    name: "",
    price: "",
    category: "",
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      className: "products-column",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text || "https://via.placeholder.com/50"}
          alt="product"
          className="product-image"
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      className: "products-column",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      className: "products-column",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      className: "products-column",
    },
    {
      title: "Trạng thái",
      render: (_, record) => (
        <Space size="middle">
          <Button className="btn-edit">Sửa</Button>
          <Button
            className="btn-delete"
            onClick={() => handleDelete(record.key)}
            danger
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (key) => {
    const updatedCategories = categories.filter((item) => item.key !== key);
    setCategories(updatedCategories);
  };

  const handleAddProduct = () => {
    const newKey = (categories.length + 1).toString();
    setCategories([...categories, { key: newKey, ...newProduct }]);
    setNewProduct({ image: "", name: "", price: "", category: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="products-container">
      <Header title="Quản lý sản phẩm" />
      <div className="products-manage">
        <Button
          type="primary"
          className="btn-add"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm sản phẩm
        </Button>
        <Table
          columns={columns}
          dataSource={categories}
          className="products-table"
        />
      </div>

      <Modal
        title="Thêm sản phẩm mới"
        visible={isModalOpen}
        onOk={handleAddProduct}
        onCancel={() => setIsModalOpen(false)}
        okText="Thêm"
        cancelText="Hủy"
        className="products-modal"
      >
        <Form layout="vertical">
          <Form.Item label="URL Hình ảnh">
            <Input
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              placeholder="Nhập URL hình ảnh"
              className="input-field"
            />
          </Form.Item>
          <Form.Item label="Tên sản phẩm">
            <Input
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="Nhập tên sản phẩm"
              className="input-field"
            />
          </Form.Item>
          <Form.Item label="Giá">
            <Input
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="Nhập giá sản phẩm"
              className="input-field"
            />
          </Form.Item>
          <Form.Item label="Danh mục">
            <Input
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              placeholder="Nhập danh mục sản phẩm"
              className="input-field"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
