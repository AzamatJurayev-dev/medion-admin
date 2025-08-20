import { Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { NewsItem } from "../types";
const TextareaStyle = "text-sm max-w-40 overflow-ellipsis line-clamp-2";

const renderTruncatedColumn = () => (text: string) =>
  (
    <div
      className="text-sm overflow-ellipsis max-w-40 line-clamp-1"
      title={text}
    >
      {text}
    </div>
  );

export const getNewsColumns = (
  //   onEdit: (record: AwardAttributesUpdate) => void,
  //   onOpenModal: () => void,
  //   onDelete: (id: number) => void,
  lang: "uz" | "en" | "ru",
  t: (key: string) => string
): ColumnsType<NewsItem> => [
  {
    title: (
      <span className="text-left font-sans text-sm font-normal leading-5 text-secondary-dark">
        №
      </span>
    ),
    key: "index",
    render: (_, __, index) => (
      <span className="font-sans text-sm font-normal leading-6 text-dark">
        {index + 1}
      </span>
    ),
    width: 48,
  },
  {
    title: t("Title"),
    dataIndex: "title",
    render: (_, record) => renderTruncatedColumn()(record.title?.[lang]),
  },
  {
    title: t("Sub Description"),
    dataIndex: "subDesc",
    render: (_, record) => (
      <p
        dangerouslySetInnerHTML={{ __html: record.subDesc?.[lang] }}
        className={TextareaStyle}
      />
    ),
  },
  {
    title: t("Description"),
    dataIndex: "description",
    render: (_, record) => (
      <p
        dangerouslySetInnerHTML={{ __html: record.description?.[lang] }}
        className={TextareaStyle}
      />
    ),
  },
  {
    title: "Date",
    dataIndex: "createDate",
  },
  {
    title: t("Images"),
    dataIndex: "photos",
    render: (_, record) => (
      <Image.PreviewGroup
        preview={{
          onChange: (current, prev) =>
            console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
        <div className="flex gap-2">
          {record.photos?.data?.map((photo) => (
            <div
              key={photo.id}
              className="size-12 justify-center items-center flex rounded-full border border-gray-200 overflow-hidden"
            >
              <Image
                className="object-cover size-12"
                src={imageUrlGenerator(photo.url)}
                alt="cover"
              />
            </div>
          ))}
        </div>
      </Image.PreviewGroup>
    ),
  },

  {
    title: t("Actions"),
    fixed: "right",
    width: 150,
    render: () => (
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          //   onClick={() => {
          //     onEdit(record);
          //     onOpenModal();
          //   }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          //   onClick={() => onDelete(record.id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];
