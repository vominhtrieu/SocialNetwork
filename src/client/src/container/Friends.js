import React from "react";
import Box from "@material-ui/core/Box";
import FriendRequest from "../component/Friends/FriendRequest";
import { HOST } from "../config/constant";
import EmptyFriendPage from "../component/Friends/EmptyFriendPage";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

function Friends({ socket }) {
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    fetch(HOST + "/friendrequests", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ requests }) => setRequests(requests));
  }, []);

  React.useEffect(() => {
    socket.on("respondFriendRequest", (response) => {
      setRequests((requests) =>
        requests.filter((request) => {
          return request !== response.requestId;
        })
      );
    });

    socket.on("newFriendRequest", ({requestId}) => {
      setRequests((requests)=>[...requests, requestId]);
    });

    return () => {
      socket.off("respondFriendRequest");
    }
  }, [socket]);

  if (requests.length === 0) {
    return <EmptyFriendPage />;
  }
  
  const FriendRequests = requests.map((request, index) => {
    return <FriendRequest socket={socket} requestId={request} key={index} />;
  });
  return (
    <Box marginTop={2} width="100%">
      <Helmet>
        <title>MTNET - Friend</title>
      </Helmet>
      {FriendRequests}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket,
});

export default connect(mapStateToProps)(Friends);
