import React from "react";
import { Divider, Avatar } from "antd";
import { Link, useHistory, useLocation as locations } from "react-router-dom";

export default function TrendSection({ trend, trends }) {
  const { caption, user, commentsCount, retweetCount, likesCount, _id, files } =
    trend;
  const history = useHistory();

  return (
    <div style={{ marginLeft: "7px" }}>
      <div
        class="flex justify-between"
        onClick={() => history.push(`/${user?.username}/status/${_id}`)}
      >
        <div class="flex">
          <Avatar
            style={{
              backgroundColor: "#87d068",
              marginRight: "10px",
            }}
            src={user?.avatar}
          />
          {"   "}
          <Link to={`${user.username}`}>
            {trends ? (
              <h3 class="font-bold text-gray-700">{user.username}</h3>
            ) : (
              <h3 class="font-bold text-white">{user.username}</h3>
            )}
          </Link>
        </div>
      </div>
      <br></br>

      {files ? (
        <img
          onClick={() => history.push(`/${user?.username}/status/${_id}`)}
          src={files}
          class="h-27 w-27  rounded-lg cursor-pointer"
        />
      ) : null}
      {trends ? (
        <h1
          onClick={() => history.push(`/${user?.username}/status/${_id}`)}
          class="text-lg italic ml-5 mt-4 text-gray-900"
          style={{ cursor: "pointer" }}
        >
          {caption}
        </h1>
      ) : (
        <h1
          onClick={() => history.push(`/${user?.username}/status/${_id}`)}
          class="text-lg italic ml-5 mt-4 text-white"
          style={{ cursor: "pointer" }}
        >
          {caption}
        </h1>
      )}
      <div
        onClick={() => history.push(`/${user?.username}/status/${_id}`)}
        class="flex justify-between mt-3"
      >
        {trends ? (
          <p class="text-sm italic text-gray-700 ">{commentsCount} comments</p>
        ) : (
          <p class="text-sm italic text-white ">{commentsCount} comments</p>
        )}
        {trends ? (
          <p class="text-sm italic text-gray-700 ml-2">{likesCount} Likes</p>
        ) : (
          <p class="text-sm italic text-white ml-2">{likesCount} Likes</p>
        )}
        {trends ? (
          <p class="text-sm italic text-gray-700 ml-2">
            {retweetCount} Rewteets
          </p>
        ) : (
          <p class="text-sm italic text-white ml-2">{retweetCount} Rewteets</p>
        )}
      </div>
      <br></br>
      <hr style={{ color: "white", width: "140px", marginLeft: "35px" }}></hr>
      <br></br>
    </div>
  );
}
