import React from "react";
import moment from "moment/moment";
import { Tooltip } from "antd";
import { emojify } from "react-emojione";
import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";

export default function SentMessage({ message, roomInfo, last }) {
  const seenParticipants = roomInfo.participants.filter(
    (participant) => participant.messageSeen >= roomInfo.messageCount
  );
  return (
    <div style={{ display: "flex", alignItems: "flex-end", flexFlow: "column", marginBottom: 4 }}>
      <Tooltip color="#177DDC" title={moment(message.date).format("DD-MM-YYYY hh:mm")} placement="left">
        <div style={{ padding: "6px 12px", borderRadius: 20, background: "#177DDC", marginLeft: 5 }}>
          <pre style={{ marginBottom: 0 }}>{emojify(message.textContent, { style: { height: 18 } })}</pre>
        </div>
      </Tooltip>
      {last ? (
        seenParticipants.length === roomInfo.participants.length ? (
          <div style={{ fontWeight: "bold", marginRight: 6 }}>
            <CheckCircleTwoTone style={{ fontSize: 16 }} />
            <span>&nbsp;Seen</span>
          </div>
        ) : (
          <div style={{ fontWeight: "bold", marginRight: 6 }}>
            <CheckCircleOutlined style={{ fontSize: 16 }} />
            <span>&nbsp;Sent</span>
          </div>
        )
      ) : null}
    </div>
  );
}
