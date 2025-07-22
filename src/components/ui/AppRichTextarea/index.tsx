import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
};

const ReactQuillEditor = ({ value, onChange, label, placeholder }: Props) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        theme="snow"
        className="h-64 w-full"
      />
    </div>
  );
};

export default ReactQuillEditor;
