import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EmojiPicker from '../Common/EmojiPicker';
import { InputBase, Button, Box, IconButton, GridList, GridListTile } from '@material-ui/core';
import { Image as ImageIcon, EmojiEmotions as EmojiIcon, Cancel as CancelIcon } from '@material-ui/icons';
import { API_HOST } from '../../config/constant';

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1),
    fontSize: 18,
    overflowY: 'auto',
  },
  image: {
    borderRadius: 5,
  },
  fileInput: {
    display: 'none',
  },
  title: {
    textAlign: 'center',
  },
  content: {
    overflow: 'visible',
  },
  paper: { margin: 0, width: '100%' },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function AddPostDialog(props) {
  const classes = useStyles();

  const [postText, setPostText] = React.useState('');
  const [isEmojiOpened, setIsEmojiOpened] = React.useState(false);
  const [imageUrls, setImagesUrls] = React.useState([]);

  const onImageChange = (e) => {
    const files = e.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImagesUrls((imageUrls) => [...imageUrls, reader.result]);
      };
    }
  };

  const submitPost = () => {
    fetch(API_HOST + '/newpost', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: { textContent: postText } }),
    })
      .then((res) => res.json())
      .then(({ postId }) => {
        if (postId) {
          setPostText('');
          props.closeDialog({ postId: postId });
        }
      });
  };

  const removeImage = (url) => {
    setImagesUrls((urls) => urls.filter((u) => u !== url));
  };

  const addEmoji = (emoji) => {
    setPostText((text) => text + emoji);
  };

  return (
    <Dialog
      style={{ overflowY: 'scroll', zIndex: 999999 }}
      classes={{
        paper: classes.paper,
      }}
      onClose={props.closeDialog}
      aria-labelledby='addPostDialogTitle'
      open={props.open}
    >
      <DialogTitle className={classes.title} id='addPostDialogTitle' onClose={props.closeDialog}>
        New post
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <InputBase
          className={classes.input}
          autoFocus
          value={postText}
          placeholder='What are you thinking...?'
          multiline
          onChange={(e) => setPostText(e.target.value)}
          fullWidth
          rows={8}
          inputProps={{ 'aria-label': 'Add new post' }}
        />

        <GridList cols={4} cellHeight={140}>
          {imageUrls.map((url, index) => (
            <GridListTile key={index} cols={1}>
              <img className={classes.image} src={url} alt='Selected' />
              <Box position='absolute' top={-10} right={-10}>
                <IconButton onClick={() => removeImage(url)} disableFocusRipple disableTouchRipple disableRipple>
                  <CancelIcon color='secondary' />
                </IconButton>
              </Box>
            </GridListTile>
          ))}
        </GridList>

        <Box display='flex' alignItems='center'>
          <Box display='flex' flexGrow={1} flexDirection='row'>
            <Box display='flex' alignItems='center' flexGrow={1} marginRight={2}>
              <Button onClick={submitPost} variant='contained' color='primary' fullWidth>
                Post
              </Button>
            </Box>

            <Box display='flex' alignItems='center'>
              <IconButton onClick={() => setIsEmojiOpened(true)} size='small'>
                <EmojiIcon color='primary' />
              </IconButton>
              <Box position='relative'>
                {isEmojiOpened ? (
                  <EmojiPicker isOpened={isEmojiOpened} addEmoji={addEmoji} onClose={() => setIsEmojiOpened(false)} />
                ) : null}
              </Box>
            </Box>

            <input
              accept='image/*'
              name='image-file'
              id='image-file'
              type='file'
              multiple
              onChange={onImageChange}
              className={classes.fileInput}
            />
            <label htmlFor='image-file'>
              <IconButton color='primary' aria-label='Upload images' component='span'>
                <ImageIcon />
              </IconButton>
            </label>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
