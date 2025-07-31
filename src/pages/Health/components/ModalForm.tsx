import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { postBanner, updateBanner } from "../api";
import { useForm, Controller } from "react-hook-form";
import ReactQuillEditor from "../../../components/ui/AppRichTextarea";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bannerSchema,
  type BannerFormType,
  type UpdateBannerForm,
} from "../types/schema";

const BannerModal = ({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: UpdateBannerForm | null;
}) => {
  const { register, handleSubmit, reset, control } = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: { uz: "", en: "", ru: "" },
      description: { uz: "", en: "", ru: "" },
    },
  });
  const queryClient = useQueryClient();
  const createBanner = useMutation({
    mutationFn: postBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      reset();
      onClose();
    }
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateBanner(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      reset();
      onClose();
    }
  });

  const onSubmit = (data: BannerFormType) => {
    const formData = new FormData();
    if (data.coverImage && data.coverImage.length > 0) {
      formData.append("files.coverImage", data.coverImage[0]);
    }
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
      })
    );
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, formData });
    } else {
      createBanner.mutate(formData);
    }
  };
useEffect(() => {
  if (selectedItem) {
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
                  type="text"
                  placeholder="Title En"
                  {...register("title.en")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="">Title Ru</label>
                <input
                  type="text"
                  placeholder="Title Ru"
                  {...register("title.ru")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  {...register("coverImage")}
                  className="w-full mb-2 p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
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
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {selectedItem ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BannerModal;
