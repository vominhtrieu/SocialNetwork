import React, { useEffect } from 'react';
import FriendInfo from './FriendInfo';
import { API_HOST } from '../../config/constant';
import { Box, Card, CardContent } from '@material-ui/core';

export default function ProfileFriends(props) {
  const { user, profileUser } = props;
  const [friends, setFriends] = React.useState([]);
  useEffect(() => {
    fetch(`${API_HOST}/${profileUser.id}/friends`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          data.sort((a, b) => {
            if (a.firstName > b.firstName) return -1;
            if (a.firstName < b.firstName) return 1;
            return 0;
          });
          setFriends(data);
        }
      });
  }, [profileUser.id]);

  const friendList = friends.map((friend, index) => {
    return <FriendInfo user={user} friend={friend} key={index} />;
  });
  return (
    <Box marginTop={2}>
      <Card>
        <CardContent>{friendList}</CardContent>
      </Card>
    </Box>
  );
}
