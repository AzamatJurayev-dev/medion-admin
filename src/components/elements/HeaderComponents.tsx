import { AppButton } from "../ui/AppButton";

interface Props<T> {
  label: string;
  setOpenModal: () => void;
  setSelectedItem: (item: T | null) => void;
}

const HeaderComponents = <T,>({
  setOpenModal,
  setSelectedItem,
  label,
}: Props<T>) => {
  return (
    <div className="flex justify-between mb-4">
      <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
        {label}
      </p>
      <AppButton
        onClick={() => {
          setOpenModal();
          setSelectedItem(null);
        }}
      >
        + Create new entry
      </AppButton>
    </div>
  );
};

export default HeaderComponents;
