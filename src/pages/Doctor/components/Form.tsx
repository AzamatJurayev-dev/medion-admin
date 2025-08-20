import { zodResolver } from "@hookform/resolvers/zod";
import { Select, Steps, Switch, Button, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { doctorsSchema, type DoctorFormType } from "../types/schema";
import ReactQuillEditor from "../../../components/ui/AppRichTextarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDepartments } from "../../../api";
import { postDoctor, updateDoctor } from "../api";
import { appointmentDuration, days, enums, Lang } from "../../../constants";
import type { DoctorItem, WorkSchedule } from "../types";
import dayjs from "dayjs";
import useLang from "../../../utils/useLang";
import { steps } from "../constants";

const DoctorForm = ({
  onClose,
  selectedItem,
}: {
  onClose: () => void;
  selectedItem: DoctorItem | null;
}) => {
  const [current, setCurrent] = useState(0);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorsSchema),
  });
  const { lang } = useLang();
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
      const {
        name,
        about,
        experience,
        award,
        education,
        doctorType,
        workExperience,
        docEnum,
        appointmentDuration,
        workSchedule,
        departments,
      } = selectedItem;

      reset({
        name,
        about,
        experience,
        award,
        education,
        doctorType,
        workExperience,
        docEnum,
        appointmentDuration,
        departments: departments?.data?.map((d) => d.id) ?? [],
        workSchedule: {
          ...workSchedule,
        },
      });
    }
  }, [selectedItem, reset]);

  const onSubmit = (data: DoctorFormType) => {
    const formData = new FormData();
    const workSchedule: WorkSchedule = {};
    days.forEach((day) => {
      workSchedule[day] = {
        start_time: data.workSchedule[day]?.start_time || "",
        end_time: data.workSchedule[day]?.end_time || "",
      };
    });
    if (data.image && data.image.length > 0) {
      formData.append("files.image", data.image[0]);
    }
    formData.append(
      "data",
      JSON.stringify({
        name: {
          uz: data.name.uz,
          ru: data.name.ru,
          en: data.name.en,
        },
        about: {
          uz: data.about.uz,
          ru: data.about.ru,
          en: data.about.en,
        },
        education: {
          uz: data.education.uz,
          ru: data.education.ru,
          en: data.education.en,
        },
        award: {
          uz: data.award.uz,
          ru: data.award.ru,
          en: data.award.en,
        },
        experience: {
          uz: data.experience.uz,
          ru: data.experience.ru,
          en: data.experience.en,
        },
        workExperience: data.workExperience,
        departments: data.departments?.map((id) => ({ id })),
        doctorType: data.doctorType,
        docEnum: data.docEnum,
        appointmentDuration: data.appointmentDuration,
        workSchedule: workSchedule,
      })
    );
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, formData });
    } else {
      createDoctor.mutate(formData);
    }
  };

  const sectionTitle = "text-lg font-semibold text-gray-800 mb-4 border-b pb-2";

  const inputClass =
    "border px-4 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-100 outline-none w-full";

  return (
    <div className="flex flex-col gap-6">
      {/* Steps */}
      <div className="sticky top-0 z-10 bg-white">
        <Steps
          className="p-4"
          current={current}
          onChange={setCurrent}
          items={steps}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Step 1: Basic Information */}
        {current === 0 && (
          <div className="p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className={sectionTitle}>Basic Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                {Lang.map((lang) => (
                  <div key={lang}>
                    <label>Name {lang}</label>
                    <input
                      {...register(`name.${lang}`)}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                {Lang.map((lang) => (
                  <div key={lang}>
                    <label>About {lang}</label>
                    <textarea
                      {...register(`about.${lang}`)}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {current === 1 && (
          <div className="p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className={sectionTitle}>Experience</h3>
            <div className="flex flex-col gap-6">
              {Lang.map((lang) => (
                <div key={lang}>
                  <Controller
                    name={`experience.${lang}`}
                    control={control}
                    render={({ field }) => (
                      <ReactQuillEditor
                        label={`Experience ${lang}`}
                        {...field}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Award */}
        {current === 2 && (
          <div className="p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className={sectionTitle}>Award</h3>
            <div className="flex flex-col gap-6">
              {Lang.map((lang) => (
                <div key={lang}>
                  <Controller
                    name={`award.${lang}`}
                    control={control}
                    render={({ field }) => (
                      <ReactQuillEditor label={`Award ${lang}`} {...field} />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Education */}
        {current === 3 && (
          <div className="p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className={sectionTitle}>Education</h3>
            <div className="flex flex-col gap-6">
              {Lang.map((lang) => (
                <div key={lang}>
                  <Controller
                    name={`education.${lang}`}
                    control={control}
                    render={({ field }) => (
                      <ReactQuillEditor
                        label={`Education ${lang}`}
                        {...field}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Other Information */}
        {current === 4 && (
          <div className="p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className={sectionTitle}>Other Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-semibold text-gray-700">
                  Work Experience
                </label>
                <input
                  type="number"
                  {...register("workExperience")}
                  className={inputClass}
                />

                <label className="text-sm font-semibold text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  {...register("image")}
                  accept="image/*"
                  className="border px-4 py-1 rounded-lg shadow-sm focus:ring focus:ring-blue-100 outline-none w-full"
                />

                <label className="text-sm font-semibold text-gray-700">
                  Departments
                </label>
                <Controller
                  name="departments"
                  control={control}
                  render={({ field }) => (
                    <Select
                      mode="multiple"
                      className="w-full"
                      placeholder="Select Departments"
                      value={field.value}
                      onChange={field.onChange}
                      options={departments?.data.map((d) => ({
                        label: d.title?.[lang] || "—",
                        value: d.id,
                      }))}
                    />
                  )}
                />

                <label className="text-sm font-semibold text-gray-700">
                  Doctor Type
                </label>
                <Controller
                  name="doctorType"
                  control={control}
                  render={({ field }) => (
                    <Switch checked={field.value} onChange={field.onChange} />
                  )}
                />

                <label className="text-sm font-semibold text-gray-700">
                  Type Service
                </label>
                <Controller
                  name="docEnum"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      placeholder="Select type"
                      value={field.value}
                      onChange={field.onChange}
                      options={enums}
                    />
                  )}
                />
                <label className="text-sm font-semibold text-gray-700">
                  Duration
                </label>
                <Controller
                  name="appointmentDuration"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      placeholder="Select type"
                      value={field.value}
                      onChange={field.onChange}
                      options={appointmentDuration}
                    />
                  )}
                />
              </div>

              <div className="border p-4 rounded-lg bg-gray-50">
                <div className="flex flex-col gap-1">
                  {days.map((day) => (
                    <div key={day} className="flex flex-col">
                      <label>{day}</label>
                      <Controller
                        name={`workSchedule.${day}`}
                        control={control}
                        render={({ field }) => (
                          <TimePicker.RangePicker
                            format="HH:mm"
                            value={
                              field.value
                                ? [
                                    dayjs(field.value.start_time, "HH:mm"),
                                    dayjs(field.value.end_time, "HH:mm"),
                                  ]
                                : undefined
                            }
                            onChange={(times) => {
                              if (!times || times.length !== 2) {
                                field.onChange({
                                  start_time: "",
                                  end_time: "",
                                });
                                return;
                              }
                              const [start, end] = times;
                              field.onChange({
                                start_time: start?.format("HH:mm"),
                                end_time: end?.format("HH:mm"),
                              });
                            }}
                          />
                        )}
                      />
                      {errors.workSchedule?.[day]?.start_time && (
                        <p className="text-red-500 text-sm">
                          {errors.workSchedule?.[day].start_time.message}
                        </p>
                      )}
                      {errors.workSchedule?.[day]?.end_time && (
                        <p className="text-red-500 text-sm">
                          {errors.workSchedule?.[day]?.end_time.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-4">
          {current > 0 && (
            <Button
              onClick={() => setCurrent((prev) => prev - 1)}
              className="px-6 py-2"
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => setCurrent((prev) => prev + 1)}
              className="px-6 py-2"
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              className="px-6 py-2"
              loading={createDoctor.isPending || updateMutation.isPending}
            >
              {selectedItem ? "Update" : "Save"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;
