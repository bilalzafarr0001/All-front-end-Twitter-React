import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { client } from "../../components/index";
import Comment from "../Comment/Comment";
import Sidebar from "../Sidebar";
import Suggestion from "../Suggestion/Suggestion";
import Tweet from "../Tweet/Tweet.js";

const { Header, Sider, Content } = Layout;

export default function TweetDetail() {
  const params = useParams();
  const [tweet, setTweet] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    client(`/posts/${params.tweetId}`)
      .then((res) => {
        setTweet(res.data);
        setComments(res.data.comments);
        console.log("comments array", comments);
      })
      .catch((err) => toast.error(err));
  }, [params.tweetId]);

  const handleAddComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!commentText) return toast.error("Please Enter some thing...");
      const values = {
        text: commentText,
      };
      client(`/posts/${tweet._id}/comments`, { values }).then((resp) => {
        setComments([...comments, resp.data]);
        toast.success("You added a Comment.");
      });
      setCommentText("");
      window.location.reload();
    }
  };

  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            marginLeft: "6rem",
          }}
        >
          <div style={{ display: "flex", marginLeft: "25px" }}>
            <h1 style={{ fontWeight: "bold" }}>Tweet Detail ID : </h1>
            <h1 style={{ fontFamily: "italic" }}>{params.tweetId}</h1>
          </div>
          {tweet ? <Tweet post={tweet} indiv={true} /> : "No Tweet Found !"}
          <div class="flex items-center border-b border-blue-500 py-6 ml-5">
            <input
              class="appearance-none bg-transparent border-none w-full text-gray-700 mr-4 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Leave a message"
              style={{ fontStyle: "italic" }}
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              onKeyPress={handleAddComment}
            />
          </div>

          <div style={{ marginLeft: "3rem", marginTop: "4rem" }}>
            {comments?.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </Content>
      </Layout>
      <div
        style={{
          marginTop: "30px",
          marginLeft: "12px",
          width: "300px",
          padding: "10px",
        }}
      >
        <Suggestion />
      </div>
    </Layout>
  );
}
