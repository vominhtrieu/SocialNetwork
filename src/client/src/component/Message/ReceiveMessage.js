import React from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import moment from "moment/moment";
import { Tooltip } from "antd";
import { emojify } from "react-emojione";

export default function ReceiveMessage(props) {
  const { message, participants, showAvatar } = props;
  const participant = participants.find((participant) => participant.user._id === message.sender);
  if (!participant) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginBottom: 4 }}>
      <div style={{ visibility: showAvatar ? "visible" : "hidden" }}>
        <Link to={`/${participant.user._id}`}>
          <UserAvatar imageId={showAvatar ? participant.user.avatar : null} />
        </Link>
      </div>
      <Tooltip title={moment(message.date).format("DD-MM-YYYY hh:mm")} placement="right">
        <div
          style={{ padding: "6px 12px", borderRadius: 20, background: "rgba(255,255,255,0.3)", marginLeft: 5 }}
          marginLeft={1}
        >
          <pre style={{ marginBottom: 0 }}>{emojify(message.textContent, { style: { height: 18 } })}</pre>
        </div>
      </Tooltip>
    </div>
  );
}
