import { useNavigate } from "react-router-dom";

import "./Header.scss";
import { FaUserLarge } from "react-icons/fa6";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { RiMenuUnfold2Fill } from "react-icons/ri";

const Header = ({ title }) => {
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <button className="logout-button" onClick={() => navigate("/login")}>
          Thoát
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <div className="title">
        <RiMenuUnfold2Fill className="icon-show-navigate" />
        <div className="name-page">{title}</div>
      </div>
      <div className="info-user">
        <FaUserLarge className="icon-user" />
        <Dropdown overlay={menu} trigger={["click"]}>
          <DownOutlined className="icon-down" />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
