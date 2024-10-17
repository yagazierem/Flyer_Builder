import React, { useState } from "react";
import { Button, Row, Col, Typography } from "antd";
import FlyerCanvas from "../components/FlyerCanvas";
import TextInput from "../components/TextEditor";
import ImageUpload from "../components/ImageUpload";
import ToolPanel from "../components/ToolPanel";

const API_Key = process.env.OCTOAI;

const { Title } = Typography;

const FlyerBuilderPage: React.FC = () => {
  const [elements, setElements] = useState<
    {
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
      fontFamily?: string;
    }[]
  >([]);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(
    null
  );

  //   const getDetailsOcta = async (message,description,API_Key) => {

  //     try {

  //         const prompt = ` Please give an accurate response for this ${message} based on this ${description}\nReturn a JSON response with the following format: { "responseForDescription": ""}`;

  //         const response = await fetch('https://text.octoai.run/v1/chat/completions', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${API_Key}`
  //           },
  //           body: JSON.stringify({
  //             messages: [
  //                     {
  //                       content: `You are a  data scientist`,
  //                       role: "system"
  //                     },
  //                     {
  //                       content: prompt,
  //                       role: "user"
  //                     }
  //                   ],
  //             model: 'meta-llama-3.1-70b-instruct',
  //             max_tokens: 6500,
  //             presence_penalty: 0,
  //             temperature: 0,
  //             top_p: 1,
  //           }),
  //         });
  //         const data = await response.json();
  //         console.log(data?.choices[0]?.message?.content,"response from new ai");

  //         const chatResponse = data?.choices[0]?.message?.content;

  //         // Extract JSON from response
  //         const startIndex = chatResponse.indexOf('{');
  //         const endIndex = chatResponse.lastIndexOf('}');

  //         if (startIndex === -1 || endIndex === -1) {
  //             throw new Error("Failed to extract JSON from response.");
  //         }

  //         const jsonContent = chatResponse.substring(startIndex, endIndex + 1);
  //         const jsonObject = JSON.parse(jsonContent);

  //         return { jsonObject, id: response?.id };

  //     } catch (error) {
  //         console.error("Error in getDetails function:", error);
  //         throw error;  // Re-throw the error for the caller to handle, if necessary.
  //     }
  //   };

  // Add Text Element
  const addTextElement = (text: string) => {
    const newElement = {
      id: elements.length + 1,
      type: "text",
      text,
      x: 50,
      y: 50,
      width: 150,
      height: 50,
      color: "#000", // Default color
      bold: false, // Default bold
      italic: false, // Default italic
      fontFamily: "Arial", // Default font family
    };
    setElements((prev) => [...prev, newElement]);
  };

  // Add Image Element
  const addImageElement = (url: string) => {
    const newElement = {
      id: elements.length + 1,
      type: "image",
      url,
      x: 50,
      y: 50,
      width: 150,
      height: 150,
    };
    setElements((prev) => [...prev, newElement]);
  };

  // Remove Element
  const handleRemoveElement = (id: number) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
    if (selectedElementId === id) setSelectedElementId(null); // Clear selection if removed
  };

  // Change Font Color
  const handleChangeFontColor = (id: number, color: string) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === id ? { ...element, color } : element
      )
    );
  };

  // Toggle Bold
  const handleToggleBold = (id: number) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === id ? { ...element, bold: !element.bold } : element
      )
    );
  };

  // Toggle Italic
  const handleToggleItalic = (id: number) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === id ? { ...element, italic: !element.italic } : element
      )
    );
  };

  // Change Font Family
  const handleChangeFontFamily = (id: number, fontFamily: string) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === id ? { ...element, fontFamily } : element
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title
        level={2}
        style={{
          textAlign: "center",
          backgroundColor: "#f0f0f0",
          padding: "10px",
        }}
      >
        Flyer Builder
      </Title>
      <Row gutter={16}>
        <Col span={6}>
          <div style={{ marginBottom: "20px", marginTop: "30px" }}>
            <TextInput onAddText={addTextElement} />
          </div>
          <div>
            <ImageUpload onUpload={addImageElement} />
          </div>
        </Col>
        <Col
          span={18}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {/* ToolPanel and Preview Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {selectedElementId !== null && (
                <ToolPanel
                  onChangeFontColor={(color) =>
                    handleChangeFontColor(selectedElementId, color)
                  }
                  onToggleBold={() => handleToggleBold(selectedElementId!)}
                  onToggleItalic={() => handleToggleItalic(selectedElementId!)}
                  onChangeFontFamily={(font) =>
                    handleChangeFontFamily(selectedElementId!, font)
                  }
                  isBold={
                    elements.find((el) => el.id === selectedElementId)?.bold ||
                    false
                  }
                  isItalic={
                    elements.find((el) => el.id === selectedElementId)
                      ?.italic || false
                  }
                  currentFontFamily={
                    elements.find((el) => el.id === selectedElementId)
                      ?.fontFamily || "Arial"
                  }
                />
              )}
              <Button onClick={() => setIsPreview((prev) => !prev)}>
                {isPreview ? "Edit" : "Preview"}
              </Button>
            </div>
            {/* Flyer Canvas */}
            <FlyerCanvas
              elements={elements}
              onRemoveElement={handleRemoveElement}
              isPreview={isPreview}
              onSelectElement={setSelectedElementId}
              selectedElementId={selectedElementId}
              onChangeFontColor={handleChangeFontColor}
              onToggleBold={handleToggleBold}
              onToggleItalic={handleToggleItalic}
              onChangeFontFamily={handleChangeFontFamily}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FlyerBuilderPage;
