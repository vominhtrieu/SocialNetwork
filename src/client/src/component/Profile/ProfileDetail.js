import React from "react";
import { Box, Card, CardContent } from "@material-ui/core";
import {HOST} from "../../config/constant";

function ProfileDetail(props) {
    const [profile, setProfile] = React.useState(null);
    React.useEffect(()=>{
        fetch(`${HOST}/profile`, {
            method: "GET",
            credentials: "include"
        }).then(res => res.json()).then(data => setProfile(data));
    }, [])
    if(profile == null)
        return null;
    return (
        <Box marginTop={2}>
            <Card variant="outlined">
                <CardContent>
                    <b>ID: </b> {profile.id}<br/>
                    <b>First Name: </b> {profile.firstName} <br/>
                    <b>Last Name: </b> {profile.lastName} <br/>
                    <b>Email: </b> {profile.email} <br/>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ProfileDetail;