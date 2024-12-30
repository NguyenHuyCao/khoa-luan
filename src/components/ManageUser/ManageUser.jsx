import { Button, Space, Table, Modal, Input, Form, Select } from "antd";
import { useState } from "react";
import "./ManageUser.scss"; // Import file SCSS
import Header from "../Header/Header";

const ManageUser = () => {
  const [users, setUsers] = useState([
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "Admin",
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0987654321",
      address: "TP.HCM",
      role: "User",
    },
    {
      key: "3",
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0123344556",
      address: "Đà Nẵng",
      role: "User",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "User",
  });

  const [editingUser, setEditingUser] = useState(null);

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => setEditingUser({ ...record })}>Sửa</Button>
        </Space>
      ),
    },
  ];

  const handleAddUser = () => {
    const newKey = (users.length + 1).toString();
    setUsers([...users, { key: newKey, ...newUser }]);
    setNewUser({ name: "", email: "", phone: "", address: "", role: "User" });
    setIsAddModalOpen(false);
  };

  const handleEditUser = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === editingUser.key ? { ...editingUser } : user
      )
    );
    setEditingUser(null);
  };

  return (
    <div className="users-container">
      <Header title={"Quản lý người dùng"} />
      <div className="users-manage">
        <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
          Thêm người dùng
        </Button>
        <Table columns={columns} dataSource={users} />
      </div>

      {/* Modal Thêm người dùng */}
      <Modal
        title="Thêm người dùng mới"
        visible={isAddModalOpen}
        onOk={handleAddUser}
        onCancel={() => setIsAddModalOpen(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form layout="vertical">
          <Form.Item label="Họ và tên">
            <Input
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Nhập họ và tên"
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Nhập email"
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input
              value={newUser.address}
              onChange={(e) =>
                setNewUser({ ...newUser, address: e.target.value })
              }
              placeholder="Nhập địa chỉ"
            />
          </Form.Item>
          <Form.Item label="Quyền">
            <Select
              value={newUser.role}
              onChange={(value) => setNewUser({ ...newUser, role: value })}
            >
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="User">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Sửa thông tin người dùng */}
      <Modal
        title="Chỉnh sửa thông tin người dùng"
        visible={!!editingUser}
        onOk={handleEditUser}
        onCancel={() => setEditingUser(null)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form layout="vertical">
          <Form.Item label="Họ và tên">
            <Input
              value={editingUser?.name}
              onChange={(e) =>
                setEditingUser((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nhập họ và tên"
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={editingUser?.email}
              onChange={(e) =>
                setEditingUser((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Nhập email"
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input
              value={editingUser?.phone}
              onChange={(e) =>
                setEditingUser((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input
              value={editingUser?.address}
              onChange={(e) =>
                setEditingUser((prev) => ({ ...prev, address: e.target.value }))
              }
              placeholder="Nhập địa chỉ"
            />
          </Form.Item>
          <Form.Item label="Quyền">
            <Select
              value={editingUser?.role}
              onChange={(value) =>
                setEditingUser((prev) => ({ ...prev, role: value }))
              }
            >
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="User">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUser;
