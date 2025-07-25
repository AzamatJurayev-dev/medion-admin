import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
};
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false, // paste qilinganda style kirmaydi
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const ReactQuillEditor = ({ value, onChange, label, placeholder }: Props) => {
  return (
    <div className="mb-4 relative">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        theme="snow"
        modules={modules}
        formats={formats}
        className="h-56 w-full relative"
      />
    </div>
  );
};

export default ReactQuillEditor;
