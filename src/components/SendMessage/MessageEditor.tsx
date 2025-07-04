import { Input, Popover, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const { TextArea } = Input;
export default function MessageEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiSelect = (emoji: any) => {
    const emojiChar = emoji.native || emoji.colons || emoji.id || "";
    const safeValue = value || "";
    onChange(safeValue.trim() === "" ? emojiChar : safeValue + " " + emojiChar);
  };

  const emojiContent = (
    <Picker
      data={data}
      onEmojiSelect={handleEmojiSelect}
      theme="light"
      navPosition="top"
      previewPosition="none"
      emojiButtonSize={32}
      emojiSize={24}
      locale="en"
    />
  );

  return (
    <div style={{ position: "relative" }}>
      <TextArea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Xabar matnini shu yerga yozing..."
        name="text"
      />
      <Popover
        content={emojiContent}
        trigger="click"
        visible={showEmoji}
        onVisibleChange={(visible) => setShowEmoji(visible)}
      >
        <Button
          icon={<SmileOutlined />}
          style={{ position: "absolute", bottom: 10, right: 10 }}
          onClick={() => setShowEmoji(!showEmoji)}
        />
      </Popover>
    </div>
  );
}
