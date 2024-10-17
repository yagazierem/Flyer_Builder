import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const handleUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <Upload beforeUpload={handleUpload} showUploadList={false}>
      <Button icon={<UploadOutlined />}>Upload Image</Button>
    </Upload>
  );
};

export default ImageUpload;
