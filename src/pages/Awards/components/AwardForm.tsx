/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import ReactQuillEditor from "../../../components/ui/AppRichTextarea";
import { useMutation } from "@tanstack/react-query";
import { postAwards } from "../api";
import { zodResolver } from "@hookform/resolvers/zod";
import { awardSchema } from "../types/schema";

const AwardForm = () => {
  const { register, handleSubmit, control, reset } = useForm({
    resolver: zodResolver(awardSchema),
  });
  const createAward = useMutation({
    mutationFn: postAwards,
    onSuccess: () => {
      reset();
    },
  });
  const onSubmit = (data: any) => {
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

    createAward.mutate(formData);
  };
  return (
    <div>
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
                  {...register("image")}
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
            {/* {selectedItem ? "Update" : "Create"} */} Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AwardForm;
