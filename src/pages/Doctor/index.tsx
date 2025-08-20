import { useState } from "react";
import DoctorsTable from "./components/Table";
import HeaderComponents from "../../components/elements/HeaderComponents";
import DrawerForm from "./components/Drawer";
import type { DoctorItem } from "./types";

const DoctorsPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DoctorItem | null>(null);

  return (
    <div>
      <HeaderComponents
        label="Doctors"
        setOpenModal={() => setOpenDrawer(true)}
        setSelectedItem={setSelectedItem}
      />

      <div>
        {openDrawer && (
          <DrawerForm
            open={openDrawer}
            onClose={() => {
              setSelectedItem(null);
              setOpenDrawer(false);
            }}
            selectedItem={selectedItem}
          />
        )}
        <DoctorsTable
          onEdit={(item) => {
            setSelectedItem(item);
            setOpenDrawer(true);
          }}
          onOpenModal={() => setOpenDrawer(true)}
        />
      </div>
    </div>
  );
};

export default DoctorsPage;
