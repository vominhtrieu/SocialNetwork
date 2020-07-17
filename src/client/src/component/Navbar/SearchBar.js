import React from "react";
import {
    InputBase,
    IconButton,
    Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HOST } from "../../config/constant";

import {
    Search as SearchIcon,
} from "@material-ui/icons";
import MatchedFriends from "../Dialog/MatchedFriends";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    searchButton: {
        color: "black",
        position: "absolute",
        right: 5,
        top: 3,
    },
}))

export default function SearchBar(props) {
    const classes = useStyles();
    const history = useHistory();
    const [text, setText] = React.useState("");
    const [matchedUsers, setMatchedUsers] = React.useState([]);
    const searchForUser = (e) => {
        setText(e.target.value);
        fetch(`${HOST}/search?q=${e.target.value}`, {
            method: "GET",
            credentials: "include"
        }).then((res) => res.json())
            .then((user) => {
                setMatchedUsers(user);
            })
            .catch(err => { });
    }

    const redirectToUserProfile = (user) => {
        history.push(`/${user.id}`);
        setMatchedUsers([]);
    }

    const resultMenu = (Array.isArray(matchedUsers) && matchedUsers.length > 0) ? (
        <Box position="absolute">
            <MatchedFriends friends={matchedUsers} action={redirectToUserProfile} />
        </Box>
    ) : null;

    return (
        <React.Fragment>
            <InputBase
                fullWidth
                placeholder="Search..."
                value={text}
                onChange={searchForUser}
                inputProps={{ "aria-label": "search" }}
            />
            <IconButton size="small" className={classes.searchButton}>
                <SearchIcon />
            </IconButton>
            {resultMenu}
        </React.Fragment>
    )
}