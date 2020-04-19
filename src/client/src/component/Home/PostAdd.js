import React from "react";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import { CardContent, Avatar, Box } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  avatar: {
    float: "left",
    width: 40,
  },
  addPostField: {
    marginLeft: 50,
    padding: theme.spacing(0.5, 2.5, 0.5, 2.5),
    backgroundColor: fade(theme.palette.common.black, 0.07),
    borderRadius: 25,
  },
}));

function PostAdd() {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      paddingTop={2}
      paddingBottom={1}
    >
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Box display="relative">
            <Avatar className={classes.avatar}></Avatar>
            <Box className={classes.addPostField}>
              <InputBase
                className={classes.input}
                placeholder="What do you think...?"
                multiline
                fullWidth
                inputProps={{ "aria-label": "Add new post" }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PostAdd;
