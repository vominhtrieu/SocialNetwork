import React from "react";
import moment from "moment/moment";
import { Tooltip } from "antd";
import { emojify } from "react-emojione";

export default function SentMessage({ message }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: 4 }}>
      <Tooltip color="#177DDC" title={moment(message.date).format("DD-MM-YYYY hh:mm")} placement="left">
        <div style={{ padding: "6px 12px", borderRadius: 20, background: "#177DDC", marginLeft: 5 }} marginLeft={1}>
          <pre style={{ marginBottom: 0 }}>{emojify(message.textContent, { style: { height: 18 } })}</pre>
        </div>
      </Tooltip>
    </div>
  );
}
