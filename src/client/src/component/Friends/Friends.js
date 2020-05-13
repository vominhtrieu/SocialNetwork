import React from "react";
import Box from "@material-ui/core/Box";
import FriendRequest from "./FriendRequest";
import { HOST } from "../../config/constant";

function Friends() {
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    fetch(HOST + "/friendrequests", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ requests }) => setRequests(requests));
  }, []);

  const deleteRequest = (id) => {
    setRequests(
      requests.filter((request) => {
        return request.requestId !== id;
      })
    );
  };

  const FriendRequests = requests.map((request, index) => {
    return <FriendRequest deleteRequest={deleteRequest} request={request} key={index} />;
  });
  return <Box marginTop={2}>{FriendRequests}</Box>;
}

export default Friends;