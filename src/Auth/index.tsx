import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex-1 bg-white  flex rounded-r-3xl justify-center items-center text-9xl">
        MEDION
      </div>
      <div className="flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
