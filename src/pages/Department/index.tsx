import { useState } from "react";
import ModalForm from "./components/ModalForm";
import DepartmentTable from "./components/Table";
import HeaderComponents from "../../components/elements/HeaderComponents";
import type { DepartmentItem } from "./types";

const Department = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DepartmentItem | null>(null);
  return (
    <div>
      <HeaderComponents
        label="Departments"
        setOpenModal={() => setOpen(true)}
        setSelectedItem={setSelectedItem}
      />
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
