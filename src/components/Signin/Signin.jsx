import { useState } from "react";
import { Input, Button, Form, message, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import "./Signin.scss";

const SigninPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const history = useHistory();

  const handleSignUp = (values) => {
    setLoading(true);
    const { email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      setLoading(false);
      return;
    }

    // Giả lập hành động đăng ký
    setTimeout(() => {
      setLoading(false);
      message.success("Đăng ký thành công! Chuyển đến trang đăng nhập...");
      history.push("/login"); // Chuyển tới trang đăng nhập sau khi đăng ký thành công
    }, 1000);
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <h2 className="sign-up-title">Đăng ký</h2>
        <Form
          form={form}
          name="signUp"
          onFinish={handleSignUp}
          className="sign-up-form"
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

          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
          >
            <Input.Password
              prefix={<i className="fas fa-lock"></i>}
              placeholder="Xác nhận mật khẩu"
              className="input-field"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="sign-up-btn"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <Divider>Đã có tài khoản?</Divider>
        <Button
          type="default"
          block
          onClick={() => navigate("/login")}
          className="login-btn"
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};

export default SigninPage;
