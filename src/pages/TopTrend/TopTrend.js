import React, { useState, useEffect, useContext } from "react";
import { client } from "../../components/index";
import { FeedContext } from "../../context/FeedContext";
import { Link, useHistory } from "react-router-dom";
import TrendSection from "../TrendSection/TrendSection";
import { Divider } from "antd";

export default function TopTrend() {
  const { trends, setTrends } = useContext(FeedContext);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTrends(null);
    client("/posts/getTrends")
      .then((res) => {
        setTrends(res.data);
        console.log("TopTrends are ", trends);
      })
      .catch((res) => {});
  }, []);
  return (
    <div>
      <h1 class="font-bold text-2xl text-white py-3 px-3">Top Trends</h1>

      {trends?.slice(0, 4).map((trend) => (
        <TrendSection key={trend._id} trend={trend} trends={false} />
      ))}

      {trends?.length <= 4 ? null : (
        <button
          onClick={() => history.push("/trends")}
          class="ml-8 bg-transparent hover:bg-white text-white font-semibold hover:text-gray-800 py-1 px-10 border border-white hover:border-transparent rounded-full"
        >
          More
        </button>
      )}
      <div style={{ textAlign: "center" }}>
        {trends?.length === 0 && "You have More Followers!"}
      </div>
    </div>
  );
}
