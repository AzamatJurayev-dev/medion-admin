import { DatePicker, Steps } from "antd";
import type { ArticleUpdate } from "../types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, type ArticleFormType } from "../types/schema";
import ReactQuillEditor from "../../../components/ui/AppRichTextarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle, updateArticle } from "../api";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";

const ArticleForm = ({
  selectedArticle,
  onClose,
}: {
  selectedArticle: ArticleUpdate | null;
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();
  const { register, control, handleSubmit, reset } = useForm({
    resolver: zodResolver(articleSchema),
  });
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      onClose();
      reset();
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateArticle(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      onClose();
      reset();
    },
  });
  const onSubmit = (data: ArticleFormType) => {
    const formData = new FormData();
    if (data.image && data.image.length > 0) {
      formData.append("files.image", data.image[0]);
    }
    formData.append(
      "data",
      JSON.stringify({
        author: data.author,
        title: {
          uz: data.title.uz,
          en: data.title.en,
          ru: data.title.ru,
        },
        subDesc: {
          uz: data.subDesc.uz,
          en: data.subDesc.en,
          ru: data.subDesc.ru,
        },
        createDate: data.createDate,
      })
    );
    if (selectedArticle) {
      updateMutation.mutate({ id: selectedArticle.id, formData });
    } else {
      createMutation.mutate(formData);
    }
  };
  useEffect(() => {
    if (selectedArticle) {
      reset({
        author: selectedArticle.author,
        title: {
          uz: selectedArticle.title.uz,
          en: selectedArticle.title.en,
          ru: selectedArticle.title.ru,
        },
        subDesc: {
          uz: selectedArticle.subDesc.uz,
          en: selectedArticle.subDesc.en,
          ru: selectedArticle.subDesc.ru,
        },
        createDate: dayjs(selectedArticle.createDate).toDate(),
      });
    }
  }, [selectedArticle, reset]);
  const onChange = (value: number) => {
    setCurrent(value);
  };
  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);
  const steps = [
    {
      title: "Basic Information",
    },
    {
      title: "Experience",
    },
  ];
  const style = "flex flex-col gap-2";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-[440px] justify-between"
    >
      <Steps items={steps} onChange={onChange} current={current} />
      {current === 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 justify-between">
            <div className={style}>
              <label htmlFor="">{t("Author")}</label>
              <input
                {...register("author")}
                placeholder={t("Author")}
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>

            <div className={style}>
              <label htmlFor="">{t("Date")} </label>
              <Controller
                name="createDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.toDate())}
                    className="w-full px-4 py-2"
                  />
                )}
              />
            </div>
            <div className={style}>
              <p>{t("Image")}</p>
              <label
                htmlFor="upload"
                className="flex gap-2 cursor-pointer text-gray-500 text-lg px-4 py-2 rounded-lg border-dashed border-2 border-gray-300"
              >
                <UploadOutlined />
                {t("Choose file")}
              </label>
              <input
                type="file"
                id="upload"
                {...register("image")}
                className=" hidden"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-between">
            <div className={style}>
              <label htmlFor="">{t("Title")}</label>
              <input
                {...register("title.uz")}
                placeholder="Title uz"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className={style}>
              <label htmlFor="">{t("Title")}</label>
              <input
                {...register("title.en")}
                placeholder="Title en"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className={style}>
              <label htmlFor="">{t("Title")}</label>
              <input
                {...register("title.ru")}
                placeholder="Title ru"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      )}
      {current === 1 && (
        <div className="grid grid-cols-3 gap-4 w-full">
          <Controller
            name="subDesc.uz"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Sub Description"
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
                label="Sub Description"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
          <Controller
            name="subDesc.ru"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Sub Description"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
        </div>
      )}
      <div className="flex justify-between mt-4">
        {current > 0 && (
          <button
            type="button"
            className="bg-blue-500 rounded-lg text-white px-3 py-2"
            onClick={prev}
          >
            Previous
          </button>
        )}
        {current < steps.length - 1 && (
          <button
            type="button"
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
            {selectedArticle ? "Update" : "Create"}
          </button>
        )}
      </div>
    </form>
  );
};

export default ArticleForm;
