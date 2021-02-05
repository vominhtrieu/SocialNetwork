import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Avatar, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddPostDialog from '../Dialog/AddPostDialog';
import { API_HOST } from '../../config/constant';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    float: 'left',
    width: 40,
    marginRight: 10,
  },
}));

function PostAdd(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = ({ postId }) => {
    setOpen(false);
    if (postId) props.addPost(postId);
  };

  return (
    <Box display='flex' justifyContent='center' paddingTop={2} paddingBottom={1} width='100%'>
      <AddPostDialog open={open} closeDialog={closeDialog} />
      <Card variant='elevation' className={classes.root} onClick={openDialog}>
        <CardContent>
          <Box display='flex' alignItems='center'>
            <Avatar src={API_HOST + '/image/' + props.user.avatar} className={classes.avatar}></Avatar>
            <TextField
              placeholder='What are you thinking?'
              fullWidth
              inputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PostAdd);
