import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input, Button, Form, Divider, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "./Login.scss";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    // Giả lập hành động đăng nhập
    setTimeout(() => {
      setLoading(false);
      message.success("Đăng nhập thành công!");
      // Redirect hoặc làm gì đó sau khi đăng nhập thành công
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Giả lập đăng nhập với Google
    message.success("Đăng nhập bằng Google thành công!");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Đăng nhập</h2>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          className="login-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<i className="fas fa-envelope"></i>}
              placeholder="Nhập email của bạn"
              className="input-field"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<i className="fas fa-lock"></i>}
              placeholder="Nhập mật khẩu"
              className="input-field"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="login-btn"
              onClick={() => navigate("/")}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Divider>Hoặc</Divider>
        <Button
          type="default"
          block
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
          className="google-btn"
        >
          Đăng nhập với Google
        </Button>
        <p className="signin">
          Nếu chưa có tài khoản hãy nhấn{" "}
          <a className="btn-signin" onClick={() => navigate("/signin")}>
            đăng ký
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
