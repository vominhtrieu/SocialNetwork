import { Menu, Space } from "antd";
import { InfoCircleOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";

const getMenu = (user, signOut) => (
  <Menu>
    <Menu.Item>
      <Link to={`/${user.id}`}>
        <Space style={{ display: "flex", flexFlow: "column", minWidth: 200 }}>
          <UserAvatar size={96} imageId={user.avatar} />
          <h2 style={{ marginTop: 5 }}>{`${user.firstName} ${user.lastName}`}</h2>
        </Space>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link style={{ display: "flex", padding: "10px 15px", alignItems: "center" }} to="/">
        <InfoCircleOutlined style={{ fontSize: 24 }} />
        Edit Infomation
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link style={{ display: "flex", padding: "10px 15px", alignItems: "center" }} to="/">
        <SettingOutlined style={{ fontSize: 24 }} />
        Setting
      </Link>
    </Menu.Item>
    <Menu.Item onClick={signOut} style={{ display: "flex", padding: "10px 15px", alignItems: "center" }}>
      <LogoutOutlined style={{ fontSize: 24 }} />
      Sign Out
    </Menu.Item>
  </Menu>
);
export default getMenu;
