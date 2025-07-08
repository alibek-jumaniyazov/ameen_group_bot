import MDEditor from "@uiw/react-md-editor";
import { Popover, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useState } from "react";

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
    />
  );

  return (
    <div className="relative" data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val = "") => onChange(val)}
        height={200}
      />
      <Popover
        content={emojiContent}
        trigger="click"
        open={showEmoji}
        onOpenChange={setShowEmoji}
      >
        <Button
          icon={<SmileOutlined />}
          style={{ position: "absolute", bottom: 12, right: 12 }}
        />
      </Popover>
    </div>
  );
}
