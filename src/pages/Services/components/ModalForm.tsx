import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDoctors, postService, updateService } from "../api";
import { serviceSchema, type ServiceFormType } from "../types/schema";
import { getDepartments } from "../../../api";
import { useTranslation } from "react-i18next";
import { enums } from "../../../constants";
import type { ServiceItem } from "../types";

const ServiceModal = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: ServiceItem | null;
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
    mutationFn: ({ id, data }: { id: number; data: ServiceFormType }) =>
      updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      reset();
      onClose();
    },
  });
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
  const { data: doctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  console.log("doctors", doctors);
  const onSubmit = (data: ServiceFormType) => {
    const payload = {
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
      price: Number(data.price),
      type: data.type,
      department: data.department,
      doctors: data.doctors,
    };
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, data: payload });
    } else {
      createService.mutate(payload);
    }
  };
  useEffect(() => {
    if (selectedItem) {
      const departments = selectedItem.department?.data?.id ?? null;
      const doctorList = selectedItem.doctors?.data.map((doc) => doc.id);
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
        type: selectedItem.type,
        department: departments,
        doctors: doctorList,
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
                          ? d.titleUz
                          : lang === "ru"
                          ? d.titleRu
                          : d.titleEn || "—",
                      value: d.id,
                    }))}
                  />
                )}
              />
              <Controller
                name="doctors"
                control={control}
                render={({ field }) => (
                  <Select
                    className="w-full"
                    mode="multiple"
                    placeholder="Doctorlarni tanlang"
                    value={field.value}
                    onChange={field.onChange}
                    filterOption={(input, option) =>
                      (option?.label as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={doctors?.data.map((d) => ({
                      label: d?.name?.[lang],
                      value: d.id,
                    }))}
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    className="w-full"
                    placeholder="Secvice turi"
                    value={field.value}
                    onChange={field.onChange}
                    filterOption={(input, option) =>
                      (option?.label as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={enums}
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
