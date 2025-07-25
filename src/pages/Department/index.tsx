import { useState } from "react";
import { AppButton } from "../../components/ui/AppButton";
import ModalForm from "./components/ModalForm";
import DepartmentTable from "./components/Table";
import type { UpdateDepartmentForm } from "./types/schema";

const Department = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UpdateDepartmentForm | null>(
    null
  );
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">Department</p>
        <AppButton
          onClick={() => {
            setOpen(true);
            setSelectedItem(null);
          }}
        >
          + Create new department
        </AppButton>
      </div>
      <DepartmentTable
        onEdit={setSelectedItem}
        onOpenModal={() => setOpen(true)}
      />
      {open && (
        <ModalForm
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedItem(null);
          }}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default Department;
