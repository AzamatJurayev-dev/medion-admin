import {
  departmentSchema,
  type DepartmentFormType,
  type UpdateDepartmentForm,
} from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDepartments, updateDepartments } from "../api";
import { Modal, Steps } from "antd";
import ReactQuillEditor from "../../../components/ui/AppRichTextarea";

const ModalForm = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: UpdateDepartmentForm | null;
}) => {
  const [current, setCurrent] = useState(0);
  const { handleSubmit, register, control, reset } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      description: { uz: "", en: "", ru: "" },
    },
  });
  const queryClient = useQueryClient();
  const createDepartment = useMutation({
    mutationFn: postDepartments,
    onSuccess: () => {
      onClose();
      setCurrent(0);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const updateDepartment = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateDepartments(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      onClose();
      setCurrent(0);
    },
  });

  useEffect(() => {
    if (selectedItem) {
      reset({
        titleUz: selectedItem.titleUz,
        titleEn: selectedItem.titleEn,
        titleRu: selectedItem.titleRu,
        subDesc: {
          uz: selectedItem.subDesc.uz,
          en: selectedItem.subDesc.en,
          ru: selectedItem.subDesc.ru,
        },
        description: {
          uz: selectedItem.description.uz,
          en: selectedItem.description.en,
          ru: selectedItem.description.ru,
        },
      });
      setCurrent(0);
    } else {
      reset();
    }
  }, [selectedItem, reset]);

  const onSubmit = (data: DepartmentFormType) => {
    const formData = new FormData();
    if (data.icon && data.icon.length > 0) {
      formData.append("files.icon", data.icon[0]);
    }
    formData.append(
      "data",
      JSON.stringify({
        titleUz: data.titleUz,
        titleEn: data.titleEn,
        titleRu: data.titleRu,
        description: {
          uz: data.description.uz,
          en: data.description.en,
          ru: data.description.ru,
        },
        subDesc: {
          uz: data.subDesc.uz,
          en: data.subDesc.en,
          ru: data.subDesc.ru,
        },
      })
    );
    if (selectedItem) {
      updateDepartment.mutate({
        id: selectedItem.id,
        formData,
      });
    } else {
      createDepartment.mutate(formData);
    }
  };

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);
  const steps = [{ title: "Titles" }, { title: "Descriptions" }];
  const style = "flex flex-col gap-2";
  return (
    <Modal
      title="Add new Partner"
      centered
      footer={false}
      open={open}
      onCancel={onClose}
      className="w-[1200px]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-4 h-[440px]"
      >
        <Steps items={steps} />
        {current === 0 && (
          <div className="grid grid-cols-2 gap-6 w-full h-[340px]">
            <div className="flex flex-col gap-4 justify-between">
              <div className={style}>
                <label htmlFor="">Title UZ</label>
                <input
                  {...register("titleUz")}
                  placeholder="Title Uz"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className={style}>
                <label htmlFor="">Title En</label>
                <input
                  {...register("titleEn")}
                  placeholder="Title En"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className={style}>
                <label htmlFor="">Title Ru</label>
                <input
                  {...register("titleRu")}
                  placeholder="Title Ru"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className={style}>
                <label htmlFor="">Icon</label>
                <input
                  type="file"
                  {...register("icon")}
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-between">
              <div className={style}>
                <label htmlFor="">SubDescription UZ</label>
                <textarea
                  {...register("subDesc.uz")}
                  placeholder="SubDescription Uz"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className={style}>
                <label htmlFor="">SubDescription En</label>
                <textarea
                  {...register("subDesc.en")}
                  placeholder="SubDescription En"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className={style}>
                <label htmlFor="">SubDescription Ru</label>
                <textarea
                  {...register("subDesc.ru")}
                  placeholder="SubDescription Ru"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        )}
        {current === 1 && (
          <div className="grid grid-cols-3 gap-4 h-[340px]">
            <Controller
              name="description.uz"
              control={control}
              render={({ field }) => (
                <ReactQuillEditor
                  label="Description Uz"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Matnni kiriting..."
                />
              )}
            />

            <Controller
              name="description.en"
              control={control}
              render={({ field }) => (
                <ReactQuillEditor
                  label="Description En"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter English description..."
                />
              )}
            />

            <Controller
              name="description.ru"
              control={control}
              render={({ field }) => (
                <ReactQuillEditor
                  label="Description Ru"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Введите описание на русском"
                />
              )}
            />
          </div>
        )}
        <div className="flex justify-between mt-4">
          {current > 0 && (
            <button
              className="bg-blue-500 rounded-lg text-white px-3 py-2"
              onClick={prev}
            >
              Previous
            </button>
          )}
          {current < steps.length - 1 && (
            <button
              className="bg-blue-500 rounded-lg text-white px-3 py-2"
              onClick={next}
            >
              Next
            </button>
          )}
          {current === steps.length - 1 && (
            <button
              type="submit"
              className="bg-blue-500 rounded-lg text-white px-3 py-2"
            >
              {selectedItem ? "Update" : "Create"}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ModalForm;
