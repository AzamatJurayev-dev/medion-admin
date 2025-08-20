import { imageUrlGenerator } from "../../../utils/ImageUrlGenerate";
import type { DoctorData } from "../types";

interface Props {
  data?: DoctorData;
}

const WorkPhotos = ({ data }: Props) => {
  if (!data?.workPhotos) return <p>No Photos</p>;
  return (
    <div className="grid grid-cols-5 gap-4">
      {data.workPhotos.data.map((img) => (
        <div key={img.id}>
          <img src={imageUrlGenerator(img.url)} alt="" />
        </div>
      ))}
    </div>
  );
};

export default WorkPhotos;
