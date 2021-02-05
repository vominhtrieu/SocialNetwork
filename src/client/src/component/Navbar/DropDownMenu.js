import { Menu, Avatar, Space } from "antd";
import { UserOutlined, InfoCircleOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/">
        <Space style={{ display: "flex", flexFlow: "column" }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <h3>Võ Minh Triều</h3>
        </Space>
      </Link>
    </Menu.Item>
    <Menu.Item icon={<InfoCircleOutlined />}>
      <Link to="/">Edit Infomation</Link>
    </Menu.Item>
    <Menu.Item icon={<SettingOutlined />}>
      <Link to="/">Setting</Link>
    </Menu.Item>
    <Menu.Item icon={<LogoutOutlined />} danger>
      <Link to="/" style={{ color: "inherit" }}>
        Sign Out
      </Link>
    </Menu.Item>
  </Menu>
);
export default menu;
