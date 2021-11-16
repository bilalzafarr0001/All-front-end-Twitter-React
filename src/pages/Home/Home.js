import { Layout } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { client } from "../../components/index";
import { FeedContext } from "../../context/FeedContext";
import Sidebar from "../Sidebar";
import Suggestion from "../Suggestion/Suggestion";
import TopTrend from "../TopTrend/TopTrend";
import Tweet from "../Tweet/Tweet.js";
import TweetEditor from "../TweetEditor/TweetEditor.js";
import "./Home.css";

const { Content } = Layout;

function Home() {
  const { user, feed, setFeed, whoFollow, setWhoFollow } =
    useContext(FeedContext);

  const perPage = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    setFeed(null);
    setWhoFollow(null);
    client(`/users/feed?per_page=${perPage}&page=${page}`)
      .then((res) => {
        console.log("responce", res);
        setFeed(res.data);
        setTotalPages(res.lengthPost);
        localStorage.setItem("totalFeedLength", res.lengthPost);
        console.log(
          "Total Feed Length of this LOgin User ",
          localStorage.getItem("totalFeedLength")
        );
        setLoading(false);
      })
      .catch((res) => {
        toast.error(res);
      });
    console.log("Feed Data of Login User ", feed);
  }, [page]);

  const scrollToBottom = () => {
    console.log("scroll to bottom fun is calling ...");
    var heightCal = document.getElementById("tweets");
    var heightCal1 = heightCal.scrollHeight;
    console.log("heightCal1", heightCal1);
    heightCal.scrollTo({
      top: heightCal1,
      behavior: "smooth",
    });
  };

  return (
    <Layout>
      <Sidebar />

      <div
        style={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          marginLeft: "5.5rem",
        }}
      >
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              width: "51rem",
              margin: "5px 5px",
              padding: 10,
            }}
          >
            {" "}
            <TweetEditor />
            <div style={{ marginLeft: "6rem" }} id="tweets">
              {feed?.map((post) => (
                <>
                  <Tweet key={post._id} post={post} indiv={false} />
                </>
              ))}

              {localStorage.getItem("totalFeedLength") != page && (
                <button
                  onClick={() => {
                    setPage(page + 1);
                    scrollToBottom();
                  }}
                  class="w-2/3 h-10 px-5 font-bold mt-5 ml-8 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
            {feed && feed.length == 0 && (
              <div>
                <h1 style={{ margin: "50px" }}>Follow others to see Tweets</h1>
              </div>
            )}
          </Content>
        </Layout>
      </div>

      <div
        style={{
          marginLeft: "6rem",
          width: "23vw",
          padding: "10px",
          backgroundColor: "#082032",
        }}
      >
        <Suggestion />
        <hr></hr>
        <br></br>
        <br></br>
        <TopTrend />
      </div>
    </Layout>
  );
}

export default Home;
