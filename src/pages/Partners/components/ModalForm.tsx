import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Modal, Steps } from "antd";
import { Controller, useForm } from "react-hook-form";
import { partnerSchema, type PartnerFormType, type UpdatePartnerForm } from "../types/schema";
import { useEffect, useState } from "react";
import ReactQuillEditor from "../../../components/ui/AppRichTextarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPartners, updatePartners } from "../api";

const PartnerModal = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: UpdatePartnerForm | null;
}) => {
  const [current, setCurrent] = useState(0);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<PartnerFormType>({
    resolver: zodResolver(partnerSchema),
  });
  const createPartner = useMutation({
    mutationFn: postPartners,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      reset();
      onClose();
      setCurrent(0);
    },
    onError: (error) => {
      <Alert message={`${error} Ma'lumot saqlanmadi`} type="error" />;
    },
  });
  const updatePartner = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updatePartners(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      reset();
      onClose();
      setCurrent(0);
    },
  });
  const onSubmit = (data: PartnerFormType) => {
    const formData = new FormData();
    console.log("data", formData);
    if (data.image && data.image.length > 0) {
      formData.append("files.image", data.image[0]);
    }
    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        subdescUz: data.subdescUz,
        subdescEn: data.subdescEn,
        subdescRu: data.subdescRu,
        descriptionUz: data.descriptionUz,
        descriptionEn: data.descriptionEn,
        descriptionRu: data.descriptionRu,
        phoneNumber: data.phoneNumber,
        link: data.link,
      })
    );
    if (selectedItem) {
      updatePartner.mutate({ id: selectedItem.id, formData });
    } else {
      createPartner.mutate(formData);
    }
  };
  useEffect(() => {
    if (selectedItem) {
      reset({
        title: selectedItem.title,
        subdescUz: selectedItem.subdescUz,
        subdescEn: selectedItem.subdescEn,
        subdescRu: selectedItem.subdescRu,
        descriptionUz: selectedItem.descriptionUz,
        descriptionEn: selectedItem.descriptionEn,
        descriptionRu: selectedItem.descriptionRu,
        phoneNumber: selectedItem.phoneNumber,
        link: selectedItem.link,
      });
      setCurrent(0);
    } else {
      reset();
    }
  }
  , [selectedItem, reset]);

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
      className="w-[1200px] h-auto"
    >
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4"
        >
          <Steps current={current} items={steps} />
          {current === 0 && (
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="flex flex-col gap-4 justify-between">
                <div className={style}>
                  <label htmlFor="">Title</label>
                  <input
                    {...register("title")}
                    placeholder="Title"
                    className="border px-4 py-2 rounded-lg"
                  />
                </div>
                <div className={style}>
                  <label htmlFor="">Phone Number</label>
                  <input
                    {...register("phoneNumber")}
                    placeholder="Phone Number"
                    className="border px-4 py-2 rounded-lg"
                  />
                </div>
                <div className={style}>
                  <label htmlFor="">Link</label>
                  <input
                    {...register("link")}
                    placeholder="Link"
                    className="border px-4 py-2 rounded-lg"
                  />
                </div>
                <div className={style}>
                  <label htmlFor="">Image</label>
                  <input
                    type="file"
                    {...register("image")}
                    accept="image/*"
                    className="border px-4 py-2 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className={style}>
                  <label htmlFor="">Subdescription (UZ)</label>
                  <textarea
                    {...register("subdescUz")}
                    placeholder="Subdescription UZ"
                    className="border px-4 py-2 rounded-lg"
                  />
                </div>
                <div className={style}>
                  <label htmlFor="">Subdescription (EN)</label>
                  <textarea
                    {...register("subdescEn")}
                    placeholder="Subdescription EN"
                    className="border px-4 py-2 rounded-lg"
                  />
                </div>
                <div className={style}>
                  <label htmlFor="">Subdescription (RU)</label>
                  <textarea
                    {...register("subdescRu")}
                    placeholder="Subdescription RU"
                    className="border px-4 py-2 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
          {current === 1 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Controller
                name="descriptionUz"
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
                name="descriptionEn"
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
                name="descriptionRu"
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
            {current > 0 && <Button onClick={prev}>Previous</Button>}
            {current < steps.length - 1 && <Button onClick={next}>Next</Button>}
            {current === steps.length - 1 && (
              <button
                type="submit"
                className="bg-blue-500 rounded-lg text-white px-3 py-2"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PartnerModal;
