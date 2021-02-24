import React from "react";
import { Space, Modal, message, Button, Upload, Input, Avatar } from "antd";
import { SmileOutlined, CameraOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_HOST } from "../../config/constant";

const { TextArea } = Input;

let uid = 0;

export default function NewPost({ user, visible, closeModal }) {
  const [text, setText] = React.useState("");
  const [fileList, setFileList] = React.useState([]);

  const addPost = () => {
    const formData = new FormData();
    formData.set("textContent", text);
    fileList.forEach(({ file }) => {
      formData.append("images", file);
    });

    axios({
      method: "POST",
      url: `${API_HOST}/posts`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        message.success("Successfully posted your status");
        closeModal();
      })
      .catch((_err) => message.error("Error occurs, please try again!"));
  };

  const addImages = (file) => {
    if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg") {
      message.error(`${file.name} is not a valid image file`);
      return false;
    }
    const url = URL.createObjectURL(file);
    setFileList((list) => [...list, { uid: uid++, url: url, file }]);
    return true;
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <Modal
      title="Add New Post"
      visible={visible}
      okButtonProps={{ disabled: text === "" }}
      okText="Post"
      onOk={addPost}
      onCancel={closeModal}
    >
      <Space style={{ marginBottom: 10 }}>
        <Avatar src={`${API_HOST}/images/${user.avatar}`} icon={<UserOutlined />} />
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
      </Space>
      <TextArea
        onChange={(e) => {
          setText(e.target.value);
        }}
        style={{ resize: "none", height: 100 }}
        value={text}
        placeholder="Write something..."
      />

      {fileList.length > 0 && (
        <Space style={{ marginTop: 10 }}>
          <Upload onChange={handleChange} listType="picture-card" fileList={fileList} />
        </Space>
      )}
      <Space style={{ display: "flex", marginTop: 10, justifyContent: "flex-end" }}>
        <Button shape="circle" icon={<SmileOutlined />} />
        <Upload beforeUpload={addImages} showUploadList={false} multiple accept=".png,.jpg,.jpeg">
          <Button shape="circle" icon={<CameraOutlined />} />
        </Upload>
      </Space>
    </Modal>
  );
}
