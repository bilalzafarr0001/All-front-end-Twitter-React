import React from "react";
import { Link } from "react-router-dom";
import { timeSince } from "../../components/index";
import { Avatar, Divider } from "antd";

function Comment({ comment }) {
  return (
    <>
      <div
        style={{
          marginLeft: "40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Link to={`/${comment.user.username}`}>
          <div style={{ display: "flex" }}>
            <Avatar src={comment.user.avatar} width={180} />
            {"     "}
            <p
              style={{ fontSize: "17px", marginLeft: "1rem" }}
              class="font-bold text-blue-500"
            >
              @{comment.user.username}
            </p>
          </div>
        </Link>
        <p style={{ marginTop: "10px" }}>{timeSince(comment.createdAt)}</p>
      </div>

      <Divider type="vertical" />
      {comment.isCommentMine ? (
        <p
          style={{
            fontWeight: "bold",
            marginLeft: "3.3rem",
            fontStyle: "italic",
            fontSize: "17px",
          }}
        >
          {comment.text}
        </p>
      ) : (
        <p
          style={{
            fontWeight: "bold",
            marginLeft: "3.3rem",
            fontStyle: "italic",
          }}
        >
          {comment.text}
        </p>
      )}

      <hr></hr>
      <br></br>
    </>
  );
}

export default Comment;
