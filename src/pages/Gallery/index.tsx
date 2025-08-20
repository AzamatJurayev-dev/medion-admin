"use client";
import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "./api";
import { Flex } from "antd";
import { AppButton } from "../../components/ui/AppButton";
import AssetsModal from "./components/AssetsModal";
import { useState } from "react";

const GalleryPage = () => {
  const [openAssetsModal, setOpenAssetsModal] = useState(false);
  const { data } = useQuery({
    queryKey: ["photos"],
    queryFn: getPhotos,
  });
  console.log("dasd", data);
  return (
    <div>
      <Flex vertical gap={16} className="pb-6">
        <Flex className=" justify-between items-center">
          <h1 className="text-2xl">Gallery</h1>
          <AppButton onClick={() => setOpenAssetsModal(true)}>
            Add new Photo
          </AppButton>
        </Flex>
        <div className="grid grid-cols-4 gap-4">
          {data?.data.map((item) =>
            item.attributes.image.data.map((img) => (
              <div
                key={img.id}
                className=" relative w-full h-48 rounded-lg overflow-hidden"
              >
                <img
                  src={img.attributes.url}
                  className="images w-full h-full object-cover "
                />
                <p className="absolute bottom-2 left-1 text-white z-50  ">
                  {img.attributes.name}
                </p>
              </div>
            ))
          )}
        </div>
      </Flex>
      <AssetsModal
        open={openAssetsModal}
        onClose={() => setOpenAssetsModal(false)}
      />
    </div>
  );
};

export default GalleryPage;
