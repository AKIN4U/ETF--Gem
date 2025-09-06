// FIX: Add missing React import to fix reference errors.
import React from 'react';
import UploadIcon from '../icons/UploadIcon';

interface FileUploadProps {
  label: string;
  id: string;
  onFileChange: (file: File | undefined) => void;
  containerClassName?: string;
  acceptedFileTypes?: string;
  fileName?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, id, onFileChange, containerClassName = 'sm:col-span-3', acceptedFileTypes, fileName }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onFileChange(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={containerClassName}>
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="file"
          id={id}
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={acceptedFileTypes}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <UploadIcon />
          Choose File
        </button>
        <span className="text-sm text-gray-500 truncate">{fileName || 'No file selected'}</span>
      </div>
    </div>
  );
};

export default FileUpload;