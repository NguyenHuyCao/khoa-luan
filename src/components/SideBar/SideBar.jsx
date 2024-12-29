import "./SideBar.scss";
import { AiFillDashboard } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="title-page">
        <div className="logo"></div>
        <div className="name">ADMINISTRATION</div>
      </div>
      <div className="sidebar-navigate">
        <div className="item-navigate">
          <AiFillDashboard className="icon-item" />
          <div className="name-navigate">Dashboard</div>
        </div>
        <div className="item-navigate">
          <AiFillProduct className="icon-item" />
          <div className="name-navigate">Danh mục sản phẩm</div>
        </div>
        <div className="item-navigate">
          <AiFillShop className="icon-item" />
          <div className="name-navigate">Sản phẩm</div>
        </div>
        <div className="item-navigate">
          <FaShoppingCart className="icon-item" />
          <div className="name-navigate">Quản lý đơn hàng</div>
        </div>
        <div className="item-navigate">
          <FaUser className="icon-item" />
          <div className="name-navigate">Quản lý người dùng</div>
        </div>
        <div className="item-navigate">
          <AiFillMessage className="icon-item" />
          <div className="name-navigate">Quản lý phản hồi</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;