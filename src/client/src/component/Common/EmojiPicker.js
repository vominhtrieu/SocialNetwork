import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { emojify } from "react-emojione";
import { Button, Popover } from "antd";

let emojiList = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "😗",
  "😙",
  "😚",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
];

export default function EmojiPicker(props) {
  const content = (
    <div style={{ width: 200 }}>
      {emojiList.map((emoji, index) => (
        <span>
          {emojify(emoji, {
            convertShortnames: true,
            convertUnicode: true,
            convertAscii: true,
            style: {
              height: 24,
              margin: 2,
              cursor: "pointer",
            },
            onClick: () => props.addEmoji(emoji),
          })}
        </span>
      ))}
    </div>
  );

  return (
    <Popover placement={props.placement} content={content}>
      <Button style={props.style} shape="circle" icon={<SmileOutlined />} />
    </Popover>
  );
}
