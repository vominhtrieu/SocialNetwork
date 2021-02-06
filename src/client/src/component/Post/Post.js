import React from "react";
import { Card, Skeleton, Space, Typography } from "antd";
import { LikeOutlined, CommentOutlined, ShareAltOutlined, MoreOutlined, LikeFilled } from "@ant-design/icons";

import Comments from "./Comments";
import moment from "moment/moment";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { API_HOST } from "../../config/constant";
import Meta from "antd/lib/card/Meta";
import UserAvatar from "../Common/UserAvatar";
import Modal from "antd/lib/modal/Modal";
import "./post.less";

const { Paragraph } = Typography;

function Post(props) {
  const [post, setPost] = React.useState({});
  const [commentVisible, setCommentVisible] = React.useState(false);

  React.useEffect(() => {
    fetch(`${API_HOST}/posts/${props.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((post) => {
        setPost(post);
      });

    props.socket.emit("joinPost", { postId: props.id });

    props.socket.on("newLike", ({ userId, postId }) => {
      if (postId !== props.id) return;
      if (userId === props.user.id) {
        setPost((post) =>
          Object.assign({}, post, {
            liked: true,
            likeCount: post.likeCount + 1,
          })
        );
      } else {
        setPost((post) =>
          Object.assign({}, post, {
            likeCount: post.likeCount + 1,
          })
        );
      }
    });

    props.socket.on("removeLike", ({ userId, postId }) => {
      if (postId !== props.id) return;
      if (userId === props.user.id) {
        setPost((post) =>
          Object.assign({}, post, {
            liked: false,
            likeCount: post.likeCount - 1,
          })
        );
      } else {
        setPost((post) =>
          Object.assign({}, post, {
            likeCount: post.likeCount - 1,
          })
        );
      }
    });
  }, [props.id, props.socket, props.user.id]);

  const likeThisPost = () => {
    props.socket.emit("like", {
      postId: post.postId,
    });
  };

  const openComments = () => {
    setCommentVisible(true);
  };

  const closeComments = () => {
    setCommentVisible(false);
  };

  const likeButton = post.liked ? (
    <Space style={{ width: "100%", display: "flex", justifyContent: "center" }} onClick={likeThisPost}>
      <LikeFilled className="liked-btn" key="like" />
      {post.likeCount > 0 && <span>{post.likeCount}</span>}
    </Space>
  ) : (
    <Space style={{ width: "100%", display: "flex", justifyContent: "center" }} onClick={likeThisPost}>
      <LikeOutlined style={{ fontSize: 24 }} key="like" />
      {post.likeCount > 0 && <span>{post.likeCount}</span>}
    </Space>
  );

  const commentButton = (
    <Space style={{ width: "100%", display: "flex", justifyContent: "center" }} onClick={openComments}>
      <CommentOutlined style={{ fontSize: 24 }} key="comment" />
      {post.commentCount > 0 && <span>{post.commentCount}</span>}
    </Space>
  );

  const title = (
    <>
      <Link
        style={{ display: "block", color: "inherit", marginBottom: 0, lineHeight: 1 }}
        to={post.user ? `/${post.user._id}` : ""}
      >
        {post.user ? `${post.user.firstName} ${post.user.lastName}` : ""}
      </Link>
      <span style={{ fontWeight: "normal", color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
        {moment(post.date).fromNow()}
      </span>
    </>
  );

  return (
    <>
      <Modal
        title={`${post.commentCount} comments`}
        visible={commentVisible}
        onCancel={closeComments}
        footer={null}
        centered
      >
        <Comments
          socket={props.socket}
          postId={post.postId}
          liked={post.liked}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
        />
      </Modal>
      <Card
        style={{ marginBottom: 10 }}
        actions={[
          likeButton,
          commentButton,
          <ShareAltOutlined style={{ fontSize: 24 }} key="share" />,
          <MoreOutlined style={{ fontSize: 24 }} key="more" />,
        ]}
      >
        <Skeleton loading={Boolean(!post.user)} avatar active>
          <Meta
            avatar={<UserAvatar imageId={post.user ? post.user.avatar : null} />}
            title={title}
            description={
              <Paragraph
                ellipsis={{ expandable: true, rows: 4, symbol: "more" }}
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {post.textContent}
              </Paragraph>
            }
          />
        </Skeleton>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  socket: state.socket,
});

export default connect(mapStateToProps)(Post);
