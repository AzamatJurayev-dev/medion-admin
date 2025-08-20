import { Outlet } from "react-router-dom";
import Haeder from "./Haeder";
import Sider from "./Sider";

const Layout = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sider />
      <main className="px-6 flex flex-col w-full h-screen">
        <Haeder />
        <div className="flex-1 h-full overflow-y-auto p-4 rounded-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
