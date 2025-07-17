import { Outlet } from "react-router-dom";
import Haeder from "./Haeder";
import Sider from "./Sider";

const Layout = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Haeder />
      <div className="flex flex-1 overflow-hidden">
        <Sider />
        <main className="p-4 flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 bg-white w-full h-full rounded-lg">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
