import React from "react";
import Box from "@material-ui/core/Box";
import FriendRequest from "./FriendRequest";
import { HOST } from "../../config/constant";
import EmptyFriendPage from "./EmptyFriendPage";
import { Helmet } from "react-helmet";

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
  if (requests.length === 0) {
    return <EmptyFriendPage />;
  }
  const FriendRequests = requests.map((request, index) => {
    return (
      <FriendRequest
        deleteRequest={deleteRequest}
        request={request}
        key={index}
      />
    );
  });
  return (
    <Box marginTop={2}>
      <Helmet>
        <title>MTNET - Friend</title>
      </Helmet>
      {FriendRequests}
    </Box>
  );
}

export default Friends;
