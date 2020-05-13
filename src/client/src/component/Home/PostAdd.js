import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent, Avatar, Box } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import AddPostDialog from "../Dialog/AddPostDialog";
import {HOST} from "../../config/constant";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  avatar: {
    float: "left",
    width: 40,
  },
  addPostField: {
    color: "#969696",
    paddingTop: 7,
    cursor: "text",
    marginLeft: 50,
    padding: theme.spacing(0.5, 2.5, 0.5, 2.5),
    backgroundColor: fade(theme.palette.common.black, 0.07),
    borderRadius: 25,
    height: 30,
  },
}));

function PostAdd(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      paddingTop={2}
      paddingBottom={1}
    >
      <AddPostDialog open={open} closeDialog={closeDialog} />
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Box display="relative">
            <Avatar src={HOST + "/image?id=" + props.user.avatar} className={classes.avatar}></Avatar>
            <Box className={classes.addPostField} onClick={openDialog}>
              What do you think?
            </Box>
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
