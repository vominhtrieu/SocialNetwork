import React from "react";
import { Space, Upload, message, Button, Spin } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import UserAvatar from "../Common/UserAvatar";
import ImgCrop from "antd-img-crop";
import ProfileTabs from "./ProfileTabs";
import { API_HOST } from "../../config/constant";
import axios from "axios";
import "./profileIntro.less";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

function ProfileIntro({ user, profileUser, socket }) {
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);
  const [uploadingCover, setUploadingCover] = React.useState(false);
  const cover = React.useRef(null);
  const [avatarId, setAvatarId] = React.useState(profileUser.avatar);
  const [coverId, setCoverId] = React.useState(profileUser.cover);

  React.useEffect(() => {
    setAvatarId(profileUser.avatar);
    setCoverId(profileUser.cover);
  }, [profileUser]);

  const addFriend = () => {
    axios.post(API_HOST + "/addfriend", { addId: profileUser.id }).then((res) => {
      if (res.ok) {
        socket.emit("sendFriendRequest", { friendId: profileUser.id });
      }
    });
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadingAvatar(true);
      return;
    }
    if (info.file.status === "done") {
      if (info.file.response.imageId) {
        setAvatarId(info.file.response.imageId);
        setUploadingAvatar(false);
      } else {
        message.error("Cannot change avatar, please try again!");
      }
    }
  };

  const handleCoverChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadingCover(true);
      return;
    }
    if (info.file.status === "done") {
      if (info.file.response.imageId) {
        setCoverId(info.file.response.imageId);
        setUploadingCover(false);
      } else {
        message.error("Cannot change cover, please try again!");
      }
    }
  };

  const background = coverId ? `url("${API_HOST}/images/${coverId}") center` : "rgba(255,255,255,0.2)";

  return (
    <Space style={{ display: "block", width: "100%", position: "relative" }}>
      <Space
        style={{
          display: "block",
          width: "100%",
          height: 250,
          marginBottom: 50,
          position: "relative",
          backgroundSize: "cover",
          background: background,
        }}
      >
        {user.id === profileUser.id && (
          <ImgCrop shape="rect" aspect={16 / 9} zoom modalTitle="Edit your cover">
            <Upload
              name="cover"
              listType="picture"
              showUploadList={false}
              action={`${API_HOST}/cover`}
              beforeUpload={beforeUpload}
              onChange={handleCoverChange}
              withCredentials
              accept=".png,.jpg,.jpeg"
            >
              <Button
                style={{ position: "absolute", right: 5, top: 5 }}
                disabled={uploadingCover}
                size="large"
                type="primary"
                shape="circle"
              >
                {uploadingCover ? <Spin /> : <CameraOutlined />}
              </Button>
            </Upload>
          </ImgCrop>
        )}

        <Space style={{ position: "absolute", bottom: -50, left: 10 }}>
          <UserAvatar style={{ backgroundColor: "#4D4D4D" }} size={150} imageId={avatarId} preview />
          {user.id === profileUser.id && (
            <ImgCrop shape="round" zoom modalTitle="Edit your avatar">
              <Upload
                name="avatar"
                listType="picture"
                showUploadList={false}
                action={`${API_HOST}/avatar`}
                beforeUpload={beforeUpload}
                onChange={handleAvatarChange}
                withCredentials
                accept=".png,.jpg,.jpeg"
              >
                <Button
                  style={{ position: "absolute", right: 5, bottom: 5 }}
                  disabled={uploadingAvatar}
                  size="large"
                  type="primary"
                  shape="circle"
                >
                  {uploadingAvatar ? <Spin /> : <CameraOutlined />}
                </Button>
              </Upload>
            </ImgCrop>
          )}
        </Space>
      </Space>
      <Space style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>
        <h1 style={{ fontSize: 22, fontWeight: "normal" }}>{`${profileUser.firstName} ${profileUser.lastName}`}</h1>
      </Space>
    </Space>
  );
}

export default ProfileIntro;
