import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { postService, updateService } from "../api";
import type { ServiceAttributsUpdate } from "../types";
import { serviceSchema, type ServiceFormType } from "../types/schema";
import { getDepartments } from "../../../api";
import { useTranslation } from "react-i18next";

const ServiceModal = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: ServiceAttributsUpdate | null;
}) => {
  const { register, handleSubmit, reset, control } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: { uz: "", en: "", ru: "" },
      description: { uz: "", en: "", ru: "" },
    },
  });
  const { i18n } = useTranslation();
  const lang = i18n.language as "uz" | "ru" | "en";
  const queryClient = useQueryClient();
  const createService = useMutation({
    mutationFn: postService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      reset();
      onClose();
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateService(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      reset();
      onClose();
    },
  });
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
  const onSubmit = (data: ServiceFormType) => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: {
          uz: data.title.uz,
          en: data.title.en,
          ru: data.title.ru,
        },
        description: {
          uz: data.description.uz,
          en: data.description.en,
          ru: data.description.ru,
        },
        price: data.price,
        type: data.type,
      })
    );
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, formData });
    } else {
      createService.mutate(formData);
    }
  };
  useEffect(() => {
    if (selectedItem) {
      const departments = selectedItem.department?.data.id;
      reset({
        title: {
          uz: selectedItem.title.uz,
          en: selectedItem.title.en,
          ru: selectedItem.title.ru,
        },
        description: {
          uz: selectedItem.description.uz,
          en: selectedItem.description.en,
          ru: selectedItem.description.ru,
        },
        price: selectedItem.price,
        department: departments,
      });
    } else {
      reset();
    }
  }, [selectedItem, reset]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      title={selectedItem ? "Update banner" : "Add new banner"}
      centered
      className="w-fit h-fit"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2 mb-4">
              <div>
                <label htmlFor="">Title</label>
                <input
                  placeholder="Title Uz"
                  {...register("title.uz")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="">Title En</label>
                <input
                  placeholder="Title En"
                  {...register("title.en")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="">Title Ru</label>
                <input
                  placeholder="Title Ru"
                  {...register("title.ru")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  {...register("price")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div>
                <label htmlFor="">Description Uz</label>
                <textarea
                  placeholder="Description Uz"
                  {...register("description.uz")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="">Description Ru</label>
                <textarea
                  placeholder="Description Ru"
                  {...register("description.ru")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="">Description En</label>
                <textarea
                  placeholder="Description En"
                  {...register("description.en")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select
                    className="w-full"
                    placeholder="Bo‘lim(lar)ni tanlang"
                    value={field.value}
                    onChange={field.onChange}
                    filterOption={(input, option) =>
                      (option?.label as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={departments?.data.map((d) => ({
                      label:
                        lang === "uz"
                          ? d.attributes.titleUz
                          : lang === "ru"
                          ? d.attributes.titleRu
                          : d.attributes.titleEn || "—",
                      value: d.id,
                    }))}
                  />
                )}
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {selectedItem ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ServiceModal;
