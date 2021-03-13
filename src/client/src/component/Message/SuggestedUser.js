import { Checkbox } from "antd";
import UserAvatar from "../Common/UserAvatar";

function SuggestedUser({ friend, onSelected, onDeselected }) {
  const onCheckboxValueChange = (e) => {
    if (e.target.checked) onSelected(friend.id);
    else onDeselected(friend.id);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
      <Checkbox onChange={onCheckboxValueChange} style={{ color: "white" }}></Checkbox>
      <UserAvatar style={{ marginLeft: 10, marginRight: 5 }} imageId={friend.avatar} />
      <span>{`${friend.firstName} ${friend.lastName}`}</span>
    </div>
  );
}

export default SuggestedUser;
