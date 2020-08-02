import React from "react";
import { Box, Card, CardContent, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  "🥰",
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
  "🥱",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤"
];

const useStyles = makeStyles((theme) => ({
    card: {
        position: "relative",
        boxShadow: "0 0 5px rgba(0,0,0,0.4)",
        zIndex: 1000000
    },
  gridContainer: {
    width: 200,
  },
  emojiButton: {
    minWidth: 34,
    width: 34,
    margin: 0,
    padding: 0,
    fontSize: 20,
    textAlign: "center",
  },
}));

export default function EmojiPicker(props) {
  const classes = useStyles();
  const {isOpened, onClose} = props;
  if (!isOpened)
    return null;
  return (
    <Box position="absolute" bottom={30}>
      <Box position="relative">
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Grid container>
              {emojiList.map((emoji, index) => {
                return (
                  <Grid key={index} item xs={2} className={classes.gridContainer}>
                    <Button onClick={() => props.addEmoji(emoji)} size="small" className={classes.emojiButton}>
                      {emoji}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Box onClick={onClose} position="fixed" top={0} left={0} width="100vw" height="100vw">
      </Box>
    </Box>
  );
}
