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
  "🤤",
];

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    boxShadow: "0 0 5px rgba(0,0,0,0.4)",
    zIndex: 10000000,
  },
  alignLeft: {
    right: 0,
  },
  alignRight: {
    left: 0,
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
  const { isOpened, onClose, align } = props;
  const wrapperRef = React.createRef();

  React.useEffect(() => {
    const checkCloseEmojiPicker = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", checkCloseEmojiPicker);
    return () =>
      document.removeEventListener("mousedown", checkCloseEmojiPicker);
  }, [wrapperRef, onClose]);

  if (!isOpened) return null;
  return (
    <Box
      ref={wrapperRef}
      position="absolute"
      bottom={30}
      className={align === "right" ? classes.alignRight : classes.alignLeft}
    >
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Grid container>
            {emojiList.map((emoji, index) => {
              return (
                <Grid key={index} item xs={2} className={classes.gridContainer}>
                  <Button
                    onClick={() => props.addEmoji(emoji)}
                    size="small"
                    className={classes.emojiButton}
                  >
                    {emoji}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
