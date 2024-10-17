import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "antd";

interface ToolPanelProps {
  onChangeFontColor: (color: string) => void;
  onToggleBold: () => void;
  onToggleItalic: () => void;
  onChangeFontFamily: (font: string) => void;
  isBold: boolean;
  isItalic: boolean;
  currentFontFamily: string;
}

const ToolPanel: React.FC<ToolPanelProps> = ({
  onChangeFontColor,
  onToggleBold,
  onToggleItalic,
  onChangeFontFamily,
  isBold,
  isItalic,
  currentFontFamily,
}) => {
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const fonts = [
    "Arial",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana",
  ];

  const handleColorChange = (color: any) => {
    onChangeFontColor(color.hex);
    setColorPickerVisible(false); // Close color picker after selection
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      {/* Bold Button */}
      <Button
        onClick={onToggleBold}
        style={{ fontWeight: isBold ? "bold" : "normal" }}
      >
        B
      </Button>

      {/* Italic Button */}
      <Button
        onClick={onToggleItalic}
        style={{ fontStyle: isItalic ? "italic" : "normal" }}
      >
        I
      </Button>

      {/* Font Family Dropdown */}
      <select
        value={currentFontFamily}
        onChange={(e) => onChangeFontFamily(e.target.value)}
        style={{ padding: "5px" }}
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>

      {/* Inline Color Picker */}
      {/* <input
        type="color"
        onChange={(e) => onChangeFontColor(e.target.value)}
        style={{
          width: "40px",
          height: "40px",
          border: "none",
          cursor: "pointer",
        }}
      /> */}

      {/* Advanced Color Picker Button */}
      <Button onClick={() => setColorPickerVisible(!isColorPickerVisible)}>
        Color
      </Button>

      {/* Advanced Color Picker */}
      {isColorPickerVisible && (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <SketchPicker onChangeComplete={handleColorChange} disableAlpha />
        </div>
      )}
    </div>
  );
};

export default ToolPanel;
