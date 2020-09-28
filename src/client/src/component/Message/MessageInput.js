import React from "react";
import { Box, IconButton } from "@material-ui/core";
import CustimizedTextField from "../Common/CustimizedTextField";
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import EmojiIcon from "@material-ui/icons/EmojiEmotions";
import EmojiPicker from "../Common/EmojiPicker";

export default function MessageInput({ socket, roomInfo }) {
  //Text that user input
  const [textContent, setTextContent] = React.useState("");
  //Determine is the Emoji Picker is opened or not
  const [isEmojiPickerOpened, setIsEmojiPickerOpened] = React.useState(false);

  const addEmoji = (emoji) => {
    setTextContent((textContent) => {
      return textContent + emoji;
    });
  };

  const closeEmojiPicker = () => {
    setIsEmojiPickerOpened(false);
  };

  let sendMessage = () => {
    setTextContent("");
    socket.emit("message", {
      roomId: roomInfo._id,
      textContent: textContent,
    });
  };
  return (
    <Box style={{flexBasis: 45}} display="flex" alignItems="center" paddingLeft={1}>
      <IconButton size="small">
        <ImageIcon />
      </IconButton>
      <CustimizedTextField
        value={textContent}
        onChange={(text) => setTextContent(text)}
        onSubmit={sendMessage}
      />
      <Box position="relative">
        <IconButton onClick={() => setIsEmojiPickerOpened(true)} size="small">
          <EmojiIcon />
        </IconButton>
        <EmojiPicker
          isOpened={isEmojiPickerOpened}
          onClose={closeEmojiPicker}
          addEmoji={addEmoji}
        />
      </Box>
      <IconButton size="small" onClick={() => sendMessage()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
