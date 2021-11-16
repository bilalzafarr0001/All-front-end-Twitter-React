import { Layout, Divider } from "antd";
import React, { useContext } from "react";
import { FeedContext } from "../../context/FeedContext";
import Sidebar from "../Sidebar";
import Suggestion from "../Suggestion/Suggestion";
import TrendSection from "../TrendSection/TrendSection";
const { Content } = Layout;

function Trends() {
  const { trends, setTrends } = useContext(FeedContext);

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
          <h1 class="font-bold text-2xl py-4 mt-2">Top Trends</h1>
          <Divider />
          <Content
            className="site-layout-background"
            style={{
              width: "53rem",
              margin: "5px 5px",
              padding: 10,
            }}
          >
            {trends?.map((trend) => (
              <TrendSection key={trend._id} trend={trend} trends={true} />
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
        <Suggestion />
      </div>
    </Layout>
  );
}

export default Trends;
