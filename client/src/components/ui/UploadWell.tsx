import React from "react";
import {FaFileUpload} from "react-icons/fa";

const UploadWell: React.FC<{
  disabled?: boolean;
  accept?: string;
  onChange?: (files: FileList) => void;
}> = ({children, disabled, accept, onChange = files => {}, ...props}) => {
  const [dragging, setDragging] = React.useState(false);

  // Drag and drop is hard to test
  /* istanbul ignore next */
  function handleDragEnter(e: React.DragEvent) {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    const acceptMatch = !accept || e.dataTransfer.items[0].type.match(accept);
    if (e.dataTransfer.items?.length === 1 && acceptMatch) {
      setDragging(true);
      e.dataTransfer.dropEffect = "copy";
    } else {
      setDragging(false);
      e.dataTransfer.dropEffect = "none";
    }
  }
  /* istanbul ignore next */
  function handleDragExit(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }
  /* istanbul ignore next */
  function handleDrop(e: React.DragEvent) {
    const acceptMatch = !accept || e.dataTransfer.items[0].type.match(accept);

    if (disabled || !acceptMatch) return;
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files?.length === 1) {
      onChange(files);
    }
  }
  return (
    <label
      {...props}
      className={`max-w-64 w-full aspect-square ${
        disabled ? "" : dragging ? "cursor-[copy]" : "cursor-pointer"
      } shadow-inner rounded-lg ${
        dragging ? "bg-white/50" : "bg-black/50"
      } flex items-center justify-center`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragExit}
      onDragEnd={handleDragExit}
      onDrop={handleDrop}
    >
      {disabled || children ? (
        children
      ) : (
        <div className="flex items-center justify-center flex-col h-full w-full">
          <FaFileUpload size="5em" />
          <p className="text-center text-2xl mt-4">Click or Drop files here</p>
        </div>
      )}
      <input
        type="file"
        hidden
        accept={accept}
        multiple={false}
        value={""}
        onChange={e => {
          if (e.target?.files?.length === 1) {
            onChange(e.target.files);
          }
        }}
      />
    </label>
  );
};

export default UploadWell;
