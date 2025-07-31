import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promoSchema, type PromoFormType } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { postPromo, updatePromo } from "../api";
import { useEffect, useState } from "react";
import ReactQuillEditor from "../../../components/ui/AppRichTextarea";
import type { PromoAttributsUpdate } from "../types";
import { useTranslation } from "react-i18next";
import { DatePicker, Steps } from "antd";
import dayjs from "dayjs";

const steps = [
  { title: "1" },
  { title: "2" },
  { title: "3" },
  { title: "4" },
];

const PromoForm = ({
  selectedItem,
  onClose,
}: {
  selectedItem: PromoAttributsUpdate | null;
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, control } = useForm<PromoFormType>({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      title: { uz: "", en: "", ru: "" },
      description: { uz: "", en: "", ru: "" },
    },
  });

  const createPromo = useMutation({
    mutationFn: postPromo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      reset();
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updatePromo(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      reset();
      onClose();
    },
  });
  const onSubmit = (data: PromoFormType) => {
    const formData = new FormData();
    if (data.promoImage && data.promoImage.length > 0) {
      formData.append("files.promoImage", data.promoImage[0]);
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
        subDesc: {
          uz: data.subDesc.uz,
          en: data.subDesc.en,
          ru: data.subDesc.ru,
        },
        promotion_term: {
          uz: data.promotion_term.uz,
          en: data.promotion_term.en,
          ru: data.promotion_term.ru,
        },
        start_date: dayjs(data.start_date).toDate(),
        end_date: dayjs(data.end_date).toDate(),
      })
    );
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, formData });
    } else {
      createPromo.mutate(formData);
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
        subDesc: {
          uz: selectedItem.subDesc.uz,
          en: selectedItem.subDesc.en,
          ru: selectedItem.subDesc.ru,
        },
        promotion_term: {
          uz: selectedItem.promotion_term.uz,
          en: selectedItem.promotion_term.en,
          ru: selectedItem.promotion_term.ru,
        },
        start_date: dayjs(selectedItem.start_date).toDate(),
        end_date: dayjs(selectedItem.end_date).toDate(),
      });
    } else {
      reset();
    }
  }, [selectedItem, reset]);

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 justify-between h-[440px]"
    >
      <Steps current={current} items={steps} className="mb-6" />
      {current === 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <input
              {...register("title.uz")}
              placeholder="Title Uz"
              className="border rounded-lg px-4 py-2"
            />
            <input
              {...register("title.en")}
              placeholder="Title En"
              className="border rounded-lg px-4 py-2"
            />
            <input
              {...register("title.ru")}
              placeholder="Title Ru"
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="file"
              {...register("promoImage")}
              className="border rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-4">
            <textarea
              {...register("description.uz")}
              placeholder="Description Uz"
              className="border rounded-lg px-4 py-2"
            />
            <textarea
              {...register("description.en")}
              placeholder="Description En"
              className="border rounded-lg px-4 py-2"
            />
            <textarea
              {...register("description.ru")}
              placeholder="Description Ru"
              className="border rounded-lg px-4 py-2"
            />
          </div>
        </div>
      )}
      {current === 1 && (
        <div className="grid grid-cols-3 gap-4">
          <Controller
            name="subDesc.uz"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor label="SubDesc Uz" {...field} />
            )}
          />
          <Controller
            name="subDesc.en"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor label="SubDesc En" {...field} />
            )}
          />
          <Controller
            name="subDesc.ru"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor label="SubDesc Ru" {...field} />
            )}
          />
        </div>
      )}

      {current === 2 && (
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toDate())}
              />
            )}
          />
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toDate())}
              />
            )}
          />
        </div>
      )}

      {current === 3 && (
        <div className="grid grid-cols-3 gap-4">
          <textarea
            {...register("promotion_term.uz")}
            placeholder="Term Uz"
            className="border rounded-lg px-4 py-2"
          />
          <textarea
            {...register("promotion_term.en")}
            placeholder="Term En"
            className="border rounded-lg px-4 py-2"
          />
          <textarea
            {...register("promotion_term.ru")}
            placeholder="Term Ru"
            className="border rounded-lg px-4 py-2"
          />
        </div>
      )}

      <div className="flex justify-between mt-6">
        {current > 0 && (
          <button
            type="button"
            onClick={prev}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Previous
          </button>
        )}
        {current < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {t("Submit")}
          </button>
        )}
      </div>
    </form>
  );
};

export default PromoForm;
