import { useQuery } from "@tanstack/react-query";
import { getDoctorDetail } from "./api";
import { useParams } from "react-router-dom";
import { imageUrlGenerator } from "../../utils/ImageUrlGenerate";
import { useTranslation } from "react-i18next";
import { Tabs, type TabsProps } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import WorkSchedule from "./components/WorkSchedule";
import WorkPhotos from "./components/WorkPhotos";
import YandexMap from "./components/Map";

const DoctorDetail = () => {
  const id = useParams().id as string;
  const { i18n, t } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";
  const { data } = useQuery({
    queryKey: ["doctorDetail", id],
    queryFn: () => getDoctorDetail(id),
  });
  const doctor = data?.data;
  const items: TabsProps["items"] = [
    {
      key: "about",
      label: t("About"),
      children: (
        <p className="text-base"> {doctor?.about[lang] || "No Info"}</p>
      ),
    },
    {
      key: "experience",
      label: t("Experience"),
      children: (
        <p
          className="text-base"
          dangerouslySetInnerHTML={{ __html: doctor?.experience[lang] || "" }}
        />
      ),
    },
    {
      key: "education",
      label: t("Education"),
      children: (
        <p
          className="text-base"
          dangerouslySetInnerHTML={{
            __html: doctor?.education[lang] || "No Info",
          }}
        />
      ),
    },
    {
      key: "awards",
      label: t("Awards"),
      children: (
        <p
          className="text-base"
          dangerouslySetInnerHTML={{ __html: doctor?.award[lang] || "No Info" }}
        />
      ),
    },
    {
      key: "schedule",
      label: "График работы",
      children: <WorkSchedule data={data?.data} />,
    },
    {
      key: "gallery",
      label: "Галерея",
      children: <WorkPhotos data={doctor} />,
    },
    {
      key: "map",
      label: "Map",
      children:<YandexMap/>
    }
  ];
  return (
    <div className="bg-white dark:bg-gray-800 transition-colors h-full p-4 rounded-lg">
      <header className="flex flex-col gap-2">
        <div>
          <button
            className="flex items-center gap-1"
            onClick={() => window.history.back()}
          >
            <ArrowLeftOutlined /> <span className="text-2xl">{t("Back")}</span>
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center w-40 h-48 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={imageUrlGenerator(doctor?.image.data?.url)}
              alt="asas"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-3xl">
              {doctor?.name[lang] || "No Name"}
            </h1>
            <p className="text-gray-500 ">
              {doctor?.departments.data
                ?.map((dep) => {
                  return lang === "uz"
                    ? dep.titleUz
                    : lang === "en"
                    ? dep.titleEn
                    : dep.titleRu;
                })
                .join(", ") || "No Departments"}
            </p>
            <p className="text-gray-500">
              {t("Experience")} :
              {doctor?.workExperience
                ? `${doctor.workExperience} ${t("year")}`
                : "No Experience"}
            </p>
          </div>
        </div>
        <div>
          <Tabs items={items} />
        </div>
      </header>
    </div>
  );
};

export default DoctorDetail;
