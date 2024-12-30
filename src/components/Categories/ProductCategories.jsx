import { useState } from "react";
import { Button, Input } from "antd";
import { Space, Table } from "antd";

import Header from "../Header/Header";
import "./ProductCategories.scss";

const ProductCategories = () => {
  const [categories, setCategories] = useState([
    { key: "1", categories: "Nữ" },
    { key: "2", categories: "Nam" },
    { key: "3", categories: "Trẻ em" },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categories",
      key: "categories",
    },
    {
      title: "Trạng thái",
      render: (_, record) => (
        <Space size="middle">
          <Button>Sửa</Button>
          <Button onClick={() => handleDelete(record.key)} danger>
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      return;
    }

    const newKey = (categories.length + 1).toString();
    const newEntry = { key: newKey, categories: newCategory };

    setCategories([...categories, newEntry]);
    setNewCategory("");
  };

  const handleDelete = (key) => {
    const updatedCategories = categories.filter((item) => item.key !== key);
    setCategories(updatedCategories);
  };

  return (
    <>
      <Header title="Quản lý danh mục sản phẩm" />
      <div className="manage-categories-content">
        <div className="manage-categories-product">
          <h2 className="title-categories-product">
            Quản lý danh mục sản phẩm
          </h2>
          <div className="table-manage">
            <Table columns={columns} dataSource={categories} />
          </div>
        </div>
        <div className="add-category-product">
          <h2 className="title-add">Tên danh mục sản phẩm</h2>
          <div className="add-product-content">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nhập tên danh mục"
            />
            <Button type="primary" onClick={handleAddCategory}>
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategories;
