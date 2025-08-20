import { departmentSchema, type DepartmentFormType } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDepartments, updateDepartments } from "../api";
import { Modal, Steps } from "antd";
import ReactQuillEditor from "../../../components/ui/AppRichTextarea";
import type { DepartmentItem } from "../types";

const ModalForm = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: DepartmentItem | null;
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
        title: {
          uz: selectedItem.title.uz,
          en: selectedItem.title.en,
          ru: selectedItem.title.ru,
        },
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
    formData.append("data", JSON.stringify({ ...data }));
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
                  {...register("title.uz")}
                  placeholder="Title Uz"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className={style}>
                <label htmlFor="">Title En</label>
                <input
                  {...register("title.en")}
                  placeholder="Title En"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className={style}>
                <label htmlFor="">Title Ru</label>
                <input
                  {...register("title.ru")}
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
                <label htmlFor="">Description UZ</label>
                <textarea
                  {...register("description.uz")}
                  placeholder="Description Uz"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className={style}>
                <label htmlFor="">Description En</label>
                <textarea
                  {...register("description.en")}
                  placeholder="Description En"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className={style}>
                <label htmlFor="">Description Ru</label>
                <textarea
                  {...register("description.ru")}
                  placeholder="Description Ru"
                  className="border px-4 py-2 rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        )}
        {current === 1 && (
          <div className="grid grid-cols-3 gap-4 h-[340px]">
            <Controller
              name="subDesc.uz"
              control={control}
              render={({ field }) => (
                <ReactQuillEditor
                  label="Sub Description Uz"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Matnni kiriting..."
                />
              )}
            />

            <Controller
              name="subDesc.en"
              control={control}
              render={({ field }) => (
                <ReactQuillEditor
                  label="Sub Description En"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter English description..."
                />
              )}
            />

            <Controller
              name="subDesc.ru"
              control={control}
              render={({ field }) => (
                <ReactQuillEditor
                  label="Sub Description Ru"
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
