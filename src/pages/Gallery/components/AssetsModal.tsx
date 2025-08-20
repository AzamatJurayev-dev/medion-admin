import { FileAddFilled } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Modal } from "antd";
import { useState } from "react";
import { postPhotos } from "../../../api";

const AssetsModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const createPhoto = useMutation({
    mutationFn: postPhotos,
    onSuccess: () => {
      setFiles([]);
      onClose();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      alert("Iltimos, kamida bitta rasm tanlang!");
      return;
    }
    const formData = new FormData();

    // data qismi — boshqa fieldlar ham qo‘shsa bo‘ladi
    formData.append(
      "data",
      JSON.stringify({
        title: "Yangi rasm to‘plami",
      })
    );

    // multiple fayllar — modeldagi media field nomiga mos yoziladi
    files.forEach((file) => {
      formData.append("files.image", file); // "image" — model field nomi
    });

    createPhoto.mutate(formData);
  };

  return (
    <Modal
      title="Photos"
      footer={[
        <Flex className="justify-between">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>,
      ]}
      open={open}
      onCancel={onClose}
      centered
    >
      <label
        htmlFor="assetsInput"
        className="cursor-pointer flex flex-col items-center justify-center p-20 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ease-in-out"
      >
        <FileAddFilled className="text-xl" />
        <p className="text-gray-600 font-medium">
          Drag & Drop or Click to Select File
        </p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 10MB</p>
      </label>
      <input
        id="assetsInput"
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      {files.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          {files.length} file(s) selected
        </div>
      )}
    </Modal>
  );
};

export default AssetsModal;
