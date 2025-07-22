import { Input } from "antd"
import logo from "../../../public/logo.svg"
import { DashboardIcon } from "../../icons"
const Haeder = () => {
  return (
    <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 ">
      <div className="flex items-center gap-8">
        <img src={logo} alt="" />
        <Input className="h-11 w-[400px]"/>
      </div>
      <div className="flex items-center gap-4">
        <DashboardIcon/>
        <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
          
        </div>
      </div>
    </div>
  )
}

export default Haeder