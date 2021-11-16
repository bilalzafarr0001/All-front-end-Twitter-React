import {
  CommentOutlined,
  LikeFilled,
  LikeOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Layout,
  Row,
  Typography,
} from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import home from "../../Animation/liked.json";
import { client, timeSince } from "../../components/index";
import LottieAnimation from "../../Lottie";
import "./Tweet.css";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function Tweet({ post, indiv }) {
  const {
    _id,
    isLiked,
    isRetweeted,
    retweetCount,
    likesCount,
    user,
    commentsCount,
    createdAt,
    caption,
    files,
  } = post;
  const history = useHistory();
  const [likedState, setLiked] = useState(isLiked);
  const [likesState, setLikes] = useState(likesCount);
  const [like, setLike] = useState(false);
  const [retweeted, setRetweeted] = useState(isRetweeted);
  const [retweets, setRetweets] = useState(retweetCount);

  //useEffect(() => //console.log("profile page FILES STRING IS ", files));
  const handle = user?.username;

  const handleToggleLike = () => {
    if (likedState) {
      setLiked(false);
      setLikes(likesState - 1);
      client(`/posts/${_id}/toggleLike`);
    } else {
      setLiked(false);
      setLikes(likesState + 1);
      client(`/posts/${_id}/toggleLike`);
    }
  };

  const handleToggleRetweet = () => {
    if (retweeted) {
      setRetweeted(false);
      setRetweets(retweets - 1);
      client(`/posts/${_id}/toggleRetweet`);
    } else {
      setRetweeted(true);
      setRetweets(retweets + 1);
      client(`/posts/${_id}/toggleRetweet`);
    }
  };

  return (
    <Layout>
      <Layout className="site-layout">
        {indiv ? (
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
            }}
          >
            <br></br>
            <div className="site-card-border-less-wrapper">
              <Card
                title={user.username}
                bordered={true}
                style={{
                  width: "800px",
                  height: "650px",
                }}
              >
                {isRetweeted && (
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {user.username} Retweeted
                  </span>
                )}
                <br></br>
                <br></br>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex" }}>
                    <h2 style={{ cursor: "pointer" }}>
                      <Avatar
                        size="xlarge"
                        onClick={() => history.push(`/`)}
                        border
                        src={user?.avatar}
                      />
                    </h2>
                    <h4
                      style={{
                        marginLeft: "10px",
                        fontSize: "18px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                      onClick={() => history.push(`/${user?.username}`)}
                    >
                      @{user?.username}
                    </h4>
                  </div>
                  <span style={{ fontSize: "13px" }} className="secondary">
                    {timeSince(createdAt)} ago
                  </span>
                </div>

                <Title style={{ margin: "10px", marginTop: "2rem" }} level={5}>
                  <Link to={`/${handle}/status/${_id}`}>
                    <Divider type="vertical" /> {caption}
                  </Link>
                </Title>
                {files ? (
                  <div style={{ width: "400px", height: "150px" }}>
                    <Link
                      to={`/${handle}/status/${_id}`}
                      className="tweet__image"
                    >
                      <img
                        src={files}
                        alt=""
                        style={{
                          marginLeft: "1.5rem",
                          width: "550px",
                          height: "200px",
                          borderRadius: "15px",
                        }}
                      />
                    </Link>
                  </div>
                ) : null}

                <div
                  style={{
                    marginTop: "4.5rem",
                    marginLeft: "2rem",
                  }}
                >
                  <Row
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Col span={8}>
                      <div className={retweeted ? "isRetweet" : ""}>
                        <Button type="primary" onClick={handleToggleRetweet}>
                          <RetweetOutlined />
                        </Button>
                        {"  "}
                        <span>{retweets}</span>
                      </div>
                    </Col>
                    <Col span={8}>
                      {" "}
                      <div className={likedState ? "isLiked" : ""}>
                        <Button type="primary" onClick={handleToggleLike}>
                          {likedState ? <LikeFilled /> : <LikeOutlined />}
                        </Button>
                        {"  "}
                        <span>{likesCount}</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </Content>
        ) : (
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 170,
            }}
          >
            <br></br>

            <div class="max-w-sm max-w-lg max-w-md rounded overflow-hidden shadow-lg">
              {isRetweeted && (
                <>
                  {" "}
                  <RetweetOutlined />{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {user.username} Retweeted
                  </span>
                </>
              )}
              {like && (
                <LottieAnimation lotti={home} height={300} width={300} />
              )}
              {files ? <img class="w-full" src={files} /> : null}
              <div class="px-6 py-4 ">
                <div class="flex">
                  {" "}
                  <img
                    class="w-10 h-10 rounded-full mr-4"
                    onClick={() => history.push(`/${user.username}`)}
                    src={user?.avatar}
                  />
                  <div
                    class="font-bold text-xl mb-2 text-gray-800 italic"
                    onClick={() => history.push(`/${user?.username}`)}
                  >
                    {user.username}
                  </div>
                </div>
                <br></br>
                <Link to={`/${handle}/status/${_id}`}>
                  <p class="text-gray-700 text-base"> {caption}</p>
                </Link>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {" "}
                  <div className={retweeted ? "isRetweet" : ""}>
                    <Button type="primary" onClick={handleToggleRetweet}>
                      <RetweetOutlined />
                    </Button>
                    {"  "}
                    <span>{retweets}</span>
                  </div>
                </span>

                <span class="inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <div className={likedState ? "isLiked" : ""}>
                    <Button type="danger" onClick={handleToggleLike}>
                      {likedState ? (
                        <>
                          <LikeFilled />
                        </>
                      ) : (
                        <LikeOutlined />
                      )}
                    </Button>
                    {"  "}
                    <span>{likesState}</span>
                  </div>
                </span>
                <span class="inline-block   rounded-full px-5 py-3 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <Link to={`/${handle}/status/${_id}`}>
                    <Button type="primary">
                      <CommentOutlined />
                    </Button>{" "}
                    {"    "} <span>{commentsCount}</span>
                  </Link>
                </span>
              </div>
            </div>
          </Content>
        )}
      </Layout>
    </Layout>
  );
}

export default Tweet;
