import React from "react";
import Box from "@material-ui/core/Box";
import FriendRequest from "./FriendRequest";

function Friends() {
    return(
        <Box marginTop={2}>
            <FriendRequest />
            <FriendRequest />
        </Box>
    )
}

export default Friends;