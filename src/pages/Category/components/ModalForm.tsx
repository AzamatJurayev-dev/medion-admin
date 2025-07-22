import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { AppButton } from "../../../components/ui/AppButton";
import { categorySchema, type CategoryFormType } from "../types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCatigories, updateCategory } from "../api";

const ModalForm = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: (CategoryFormType & { id: number }) | null;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
  });

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: postCatigories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  const onSubmit = (formData: CategoryFormType) => {
    const payload = {
      nameUz: formData.nameUz,
      nameEn: formData.nameEn,
      nameRu: formData.nameRu,
    };
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem?.id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
    onClose();
    reset();
  };

  useEffect(() => {
    if (selectedItem) {
      reset({
        nameUz: selectedItem.nameUz,
        nameEn: selectedItem.nameEn,
        nameRu: selectedItem.nameRu,
    })
    } else {
      reset();
    }
  }, [selectedItem, reset]);

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
        {errors.nameUz && (
          <p className="text-red-500">{errors.nameUz.message}</p>
        )}

        <input
          {...register("nameEn")}
          placeholder="Name EN"
          className="border px-4 py-2 rounded-lg"
        />
        {errors.nameEn && (
          <p className="text-red-500">{errors.nameEn.message}</p>
        )}

        <input
          {...register("nameRu")}
          placeholder="Name RU"
          className="border px-4 py-2 rounded-lg"
        />
        {errors.nameRu && (
          <p className="text-red-500">{errors.nameRu.message}</p>
        )}

        <AppButton
          type="submit"
          className="mt-2 w-full text-white px-4 py-2 rounded"
        >
          {selectedItem ? "Update" : "Create"}
        </AppButton>
      </form>
    </Modal>
  );
};

export default ModalForm;
