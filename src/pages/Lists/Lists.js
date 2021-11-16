import { Layout, Divider } from "antd";
import React, { useContext, useEffect } from "react";
import { FeedContext } from "../../context/FeedContext";
import Sidebar from "../Sidebar";
import FollowSuggestion from "../Suggestion/FollowSuggestion";
import TopTrend from "../TopTrend/TopTrend";

const { Content } = Layout;

function Lists() {
  const { whoFollow, setWhoFollow } = useContext(FeedContext);

  return (
    <Layout>
      <Sidebar />
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          marginLeft: "7rem",
        }}
      >
        <Layout className="site-layout">
          <h1 class="mt-5 font-bold text-2xl text-grey-800 py-4 ">
            WHO TO FOLLOW
          </h1>
          <Divider />
          <Content
            className="site-layout-background"
            style={{
              width: "53rem",
              margin: "5px 5px",
              padding: 10,
            }}
          >
            {whoFollow?.map((user) => (
              <FollowSuggestion key={user._id} user={user} list={true} />
            ))}
          </Content>
        </Layout>
      </div>
      <div
        style={{
          marginLeft: "3rem",
          width: "20vw",
          padding: "10px",
          backgroundColor: "#082032",
        }}
      >
        <TopTrend />
      </div>
    </Layout>
  );
}

export default Lists;
