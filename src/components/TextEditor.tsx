import React, { useState } from 'react';
import { Input, Button } from 'antd';

interface TextInputProps {
  onAddText: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onAddText }) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text) {
      onAddText(text);
      setText('');
    }
  };

  return (
    <div>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add text"
        style={{ marginBottom: '10px' }}
      />
      <Button type="primary" onClick={handleAdd} className='d-flex justify-end'>
        Add Text
      </Button>
    </div>
  );
};

export default TextInput;
