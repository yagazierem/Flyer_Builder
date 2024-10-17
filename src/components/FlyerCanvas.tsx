import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ToolPanel from "./ToolPanel"; // Ensure the path to ToolPanel is correct

interface Element {
  id: number;
  type: string;
  text?: string;
  url?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  fontFamily?: string; // Added font family support
}

interface FlyerCanvasProps {
  elements: Element[];
  onRemoveElement: (id: number) => void;
  isPreview: boolean;
  onSelectElement: (id: number) => void;
  selectedElementId: number | null;
  onChangeFontColor: (id: number, color: string) => void;
  onToggleBold: (id: number) => void;
  onToggleItalic: (id: number) => void;
  onChangeFontFamily: (id: number, fontFamily: string) => void; // New prop
}

const FlyerCanvas: React.FC<FlyerCanvasProps> = ({
  elements,
  onRemoveElement,
  isPreview,
  onSelectElement,
  selectedElementId,
  onChangeFontColor,
  onToggleBold,
  onToggleItalic,
  onChangeFontFamily,
}) => {
  const [positions, setPositions] = useState<
    Record<number, { x: number; y: number; width: number; height: number }>
  >({});

  useEffect(() => {
    const initialPositions = elements.reduce((acc, el) => {
      acc[el.id] = {
        x: el.x,
        y: el.y,
        width: el.width || 150,
        height: el.height || 150,
      };
      return acc;
    }, {} as Record<number, { x: number; y: number; width: number; height: number }>);

    setPositions(initialPositions);
  }, [elements]);

  const handleDrag = (id: number, x: number, y: number) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y },
    }));
  };

  const handleResize = (
    id: number,
    width: number,
    height: number,
    x: number,
    y: number
  ) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { width, height, x, y },
    }));
  };

  const calculateFontSize = (width: number) => Math.max(16 * (width / 150), 16);

  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        margin: "0 auto",
        position: "relative",
        backgroundColor: "white",
        border: "2px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* {selectedElementId !== null && (
        <ToolPanel
          onChangeFontColor={(color) =>
            onChangeFontColor(selectedElementId, color)
          }
          onToggleBold={() => onToggleBold(selectedElementId)}
          onToggleItalic={() => onToggleItalic(selectedElementId)}
          onChangeFontFamily={(font) =>
            onChangeFontFamily(selectedElementId, font)
          }
          isBold={
            elements.find((el) => el.id === selectedElementId)?.bold || false
          }
          isItalic={
            elements.find((el) => el.id === selectedElementId)?.italic || false
          }
          currentFontFamily={
            elements.find((el) => el.id === selectedElementId)?.fontFamily ||
            "Arial"
          }
        />
      )} */}
      {elements.map((element) => (
        <Rnd
          key={element.id}
          size={{
            width: positions[element.id]?.width ?? element.width,
            height: positions[element.id]?.height ?? element.height,
          }}
          position={{
            x: positions[element.id]?.x ?? element.x,
            y: positions[element.id]?.y ?? element.y,
          }}
          bounds="parent"
          disableDragging={isPreview}
          enableResizing={!isPreview}
          onDrag={(e, d) => handleDrag(element.id, d.x, d.y)}
          onDragStop={(e, d) => {
            element.x = d.x;
            element.y = d.y;
          }}
          onResize={(e, direction, ref, delta, position) => {
            handleResize(
              element.id,
              ref.offsetWidth,
              ref.offsetHeight,
              position.x,
              position.y
            );
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            element.width = ref.offsetWidth;
            element.height = ref.offsetHeight;
            element.x = position.x;
            element.y = position.y;
          }}
          style={{
            position: "absolute",
            zIndex: element.type === "text" ? 1 : 0, // Ensure text is always on top
            border: !isPreview ? "1px dashed #ddd" : "none",
            cursor: isPreview ? "default" : "move",
          }}
          onClick={() => onSelectElement(element.id)}
        >
          <div style={{ position: "relative", height: "100%", width: "100%" }}>
            {element.type === "text" && (
              <div
                style={{
                  fontSize: `${calculateFontSize(
                    positions[element.id]?.width ?? element.width
                  )}px`,
                  wordWrap: "break-word",
                  width: "100%",
                  color: element.color,
                  fontWeight: element.bold ? "bold" : "normal",
                  fontStyle: element.italic ? "italic" : "normal",
                  fontFamily: element.fontFamily || "Arial",
                }}
              >
                {element.text}
                {!isPreview && (
                  <AiOutlineCloseCircle
                    size={15}
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => onRemoveElement(element.id)}
                  />
                )}
              </div>
            )}
            {element.type === "image" && (
              <div style={{ width: "100%", height: "100%" }}>
                <img
                  src={element.url}
                  alt="Uploaded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                {!isPreview && (
                  <AiOutlineCloseCircle
                    size={15}
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => onRemoveElement(element.id)}
                  />
                )}
              </div>
            )}
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default FlyerCanvas;
