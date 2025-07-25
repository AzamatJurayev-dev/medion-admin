import { zodResolver } from "@hookform/resolvers/zod";
import { Select, Steps } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { doctorsSchema, type DoctorFormType } from "../types/schema";
import ReactQuillEditor from "../../../components/ui/AppRichTextarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDepartments } from "../../../api";
import { postDoctor, updateDoctor } from "../api";
import type { DoctorAttributes1 } from "../types";

const DoctorForm = ({
  onClose,
  selectedItem,
}: {
  onClose: () => void;
  selectedItem: DoctorAttributes1 | null;
}) => {
  const [current, setCurrent] = useState(0);
  const { register, handleSubmit, control, reset } = useForm({
    resolver: zodResolver(doctorsSchema),
  });
  const queryClient = useQueryClient();
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
  const createDoctor = useMutation({
    mutationFn: postDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      onClose();
      reset();
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateDoctor(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      onClose();
      reset();
    },
  });
  useEffect(() => {
    if (selectedItem) {
      const departments =
        selectedItem.departments.data?.map((item) => item.id) ?? [];
      reset({
        name: {
          uz: selectedItem.name.uz,
          en: selectedItem.name.en,
          ru: selectedItem.name.ru,
        },
        about: {
          uz: selectedItem.about.uz,
          en: selectedItem.about.en,
          ru: selectedItem.about.ru,
        },
        experience: {
          uz: selectedItem.experience.uz,
          en: selectedItem.experience.en,
          ru: selectedItem.experience.ru,
        },
        award: {
          uz: selectedItem.award.uz,
          en: selectedItem.award.en,
          ru: selectedItem.award.ru,
        },
        education: {
          uz: selectedItem.education.uz,
          en: selectedItem.education.en,
          ru: selectedItem.education.ru,
        },
        workExperience: selectedItem.workExperience,
        departments: departments,
      });
    }
  }, [selectedItem, reset]);
  const onSubmit = (data: DoctorFormType) => {
    const formData = new FormData();
    if (data.image && data.image.length > 0) {
      formData.append("files.image", data.image[0]);
    }
    formData.append(
      "data",
      JSON.stringify({
        name: {
          uz: data.name.uz,
          en: data.name.en,
          ru: data.name.ru,
        },
        about: {
          uz: data.about.uz,
          en: data.about.en,
          ru: data.about.ru,
        },
        experience: {
          uz: data.experience.uz,
          en: data.experience.en,
          ru: data.experience.ru,
        },
        award: {
          uz: data.award.uz,
          en: data.award.en,
          ru: data.award.ru,
        },
        education: {
          uz: data.education.uz,
          en: data.education.en,
          ru: data.education.ru,
        },
        workExperience: data.workExperience,
        departments: data.departments,
      })
    );
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, formData });
    } else {
      createDoctor.mutate(formData);
    }
  };
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
    {
      title: "Award",
    },
    {
      title: "Education",
    },
    {
      title: "Other Information",
    },
  ];
  const style = "flex flex-col gap-2";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-4 h-[440px]"
    >
      <Steps items={steps} current={current} onChange={onChange} />
      {current === 0 && (
        <div className="grid grid-cols-2 gap-6 w-full h-[340px]">
          <div className="flex flex-col gap-4">
            <div className={style}>
              <label>Name Uz</label>
              <input
                {...register("name.uz")}
                placeholder="Name Uz"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className={style}>
              <label>Name En</label>
              <input
                {...register("name.en")}
                placeholder="Name En"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className={style}>
              <label>Name Ru</label>
              <input
                {...register("name.ru")}
                placeholder="Name Ru"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-between">
            <div className={style}>
              <label>About Uz</label>
              <textarea
                {...register("about.uz")}
                placeholder="About Uz"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className={style}>
              <label>About En</label>
              <textarea
                {...register("about.en")}
                placeholder="About En"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className={style}>
              <label>About Ru</label>
              <textarea
                {...register("about.ru")}
                placeholder="About Ru"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      )}
      {current === 1 && (
        <div className="grid grid-cols-3 gap-4 w-full ">
          <Controller
            name="experience.uz"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Experience Uz"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
          <Controller
            name="experience.en"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Experience En"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
          <Controller
            name="experience.ru"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Experience Ru"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
        </div>
      )}
      {current === 2 && (
        <div className="grid grid-cols-3 gap-4 w-full ">
          <Controller
            name="award.uz"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Award Uz"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
          <Controller
            name="award.en"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Award En"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
          <Controller
            name="award.ru"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Award Ru"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
        </div>
      )}
      {current === 3 && (
        <div className="grid grid-cols-3 gap-4 w-full ">
          <Controller
            name="education.uz"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Education Uz"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
          <Controller
            name="education.en"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Education En"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
          <Controller
            name="education.ru"
            control={control}
            render={({ field }) => (
              <ReactQuillEditor
                label="Education Ru"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matnni kiriting..."
              />
            )}
          />
        </div>
      )}
      {current === 4 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className={style}>
              <label>Work Experience</label>
              <input
                type="number"
                {...register("workExperience")}
                placeholder="Work Experience"
                className="border px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className={style}>
              <label>Image</label>
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                className="border px-4 py-1 rounded-lg w-full"
              />
            </div>
            <div className={style}>
              <label>Departments</label>
              <Controller
                name="departments"
                control={control}
                render={({ field }) => (
                  <Select
                    mode="multiple"
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
                      label: d.attributes.titleUz || "—",
                      value: d.id,
                    }))}
                  />
                )}
              />
            </div>
          </div>
          <div>Work schedule</div>
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
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default DoctorForm;
