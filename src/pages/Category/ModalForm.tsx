import { Modal } from "antd";
import { useForm } from "react-hook-form";
import type { CategoryType } from "../../types";
import { useCategory } from "./useCategory";
import { useEffect } from "react";
import { AppButton } from "../../components/ui/AppButton";

const ModalForm = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: CategoryType | null;
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<CategoryType>();
  const { createMutation, updateMutation } = useCategory();

  const onSubmit = (formData: CategoryType) => {
    const payload = {
      nameUz: formData.nameUz,
      nameEn: formData.nameEn,
      nameRu: formData.nameRu,
    };
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
    onClose();
    reset();
  };

  useEffect(() => {
    if (selectedItem) {
      setValue("nameUz", selectedItem.nameUz);
      setValue("nameEn", selectedItem.nameEn);
      setValue("nameRu", selectedItem.nameRu);
    } else {
      reset();
    }
  }, [selectedItem, setValue, reset]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      centered
      className="max-w-[400px]"
      title="Add new Category"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("nameUz")}
          placeholder="Name UZ"
          className="border px-4 py-2 rounded-lg"
        />
        <input
          {...register("nameEn")}
          placeholder="Name EN"
          className="border px-4 py-2 rounded-lg"
        />
        <input
          {...register("nameRu")}
          placeholder="Name RU"
          className="border px-4 py-2 rounded-lg"
        />
        <AppButton
          type="submit"
          className="mt-2  w-full text-white px-4 py-2 rounded"
        >
          {selectedItem ? "Update" : "Create"}
        </AppButton>
      </form>
    </Modal>
  );
};

export default ModalForm;
