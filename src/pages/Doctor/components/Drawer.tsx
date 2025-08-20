// DrawerForm.tsx
import { Drawer } from "antd";
import DoctorForm from "./Form";
import type { DoctorItem } from "../types";

const DrawerForm = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: DoctorItem | null;
}) => {
  return (
    <Drawer
      title={selectedItem ? "Edit Doctor" : "Add new Doctor"}
      open={open}
      onClose={onClose}
      width={800}
    >
      <DoctorForm onClose={onClose} selectedItem={selectedItem} />
    </Drawer>
  );
};

export default DrawerForm;
