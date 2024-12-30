import { Outlet } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar/SideBar.jsx";

function App() {
  return (
    <>
      {/* <div className="header"></div> */}
      <div className="navigate">
        <SideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
