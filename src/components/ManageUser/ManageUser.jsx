import { Button, Space, Table, Modal, Input, Form, Select } from "antd";
import { useEffect, useState } from "react";
import "./ManageUser.scss"; // Import file SCSS
import Header from "../Header/Header";
import { addUser, getUsers } from "../../services/apiServices";

const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "", // Thêm trường password
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchGetUsers = async () => {
      try {
        const res = await getUsers();
        console.log("res", res.data);
        setUsers(res.data);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchGetUsers();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Quyền",
      dataIndex: "role_name",
      key: "role_name",
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

  const handleAddUser = async () => {
    console.log("New user data:", newUser); // Kiểm tra dữ liệu đầu vào
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.name, // Thay fullname thành name
          email: newUser.email,
          phone: newUser.phone, // Thay phone_number thành phone
          address: newUser.address,
          password: newUser.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log("res", res);

      if (res.status === "success") {
        // Kiểm tra phản hồi từ server
        setIsAddModalOpen(false); // Đóng modal khi thêm thành công
        setNewUser({
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
        });

        // Fetch lại danh sách người dùng
        const fetchGetUsers = async () => {
          const usersRes = await fetch("http://localhost:8080/users");
          const usersData = await usersRes.json();
          setUsers(usersData);
        };
        fetchGetUsers();
      } else {
        console.error("Failed to add user:", res.message);
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
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
        open={isAddModalOpen}
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
          <Form.Item label="Mật khẩu">
            <Input.Password
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              placeholder="Nhập mật khẩu"
            />
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
