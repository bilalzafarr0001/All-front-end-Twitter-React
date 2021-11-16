import { Avatar, Button, Layout } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { client } from "../../components/index";
import { FeedContext } from "../../context/FeedContext";
import Follow from "../Follow/Follow";
import Sidebar from "../Sidebar";
import Suggestion from "../Suggestion/Suggestion";
import TopTrend from "../TopTrend/TopTrend";
import Tweet from "../Tweet/Tweet";
const { Header, Sider, Content } = Layout;

function Profile() {
  const { feed, setFeed, whoFollow, setWhoFollow } = useContext(FeedContext);
  const history = useHistory();
  const { handle } = useParams();
  const [profile, setProfile] = useState({});
  const [followersState, setFollowers] = useState(0);

  const perPage = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const incFollowers = () => setFollowers(followersState + 1);
  const decFollowers = () => setFollowers(followersState - 1);

  useEffect(() => {
    setLoading(true);

    client(`/users/${handle}?per_page=${perPage}&page=${page}`)
      .then((res) => {
        setProfile(res.data);
        setTotalPages(res.lengthPost);
        localStorage.setItem("totalProfileFeedLength", res.lengthPost);
        console.log(
          "Total Profile Feed Length of this Login User ",
          localStorage.getItem("totalProfileFeedLength")
        );
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [handle, page]);

  return (
    <Layout>
      <Sidebar />

      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            width: "53rem",
            margin: "15px 16px",
            marginLeft: "13rem",
            padding: 17,
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>
            {profile?.posts?.length
              ? `${profile.posts.length} Tweets`
              : "No Tweets"}
          </h1>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h2 style={{ cursor: "pointer" }}>
                <Avatar
                  size="xlarge"
                  onClick={() => history.push(`/`)}
                  border
                  src={profile?.avatar}
                />
              </h2>

              <h1
                style={{
                  marginLeft: "9px",
                  fontWeight: "bold",
                }}
              >
                {profile?.username}
              </h1>
            </div>

            {profile?.isMe ? (
              <div>
                <Button type="danger" href="/accounts/edit">
                  Edit Profile
                </Button>
              </div>
            ) : (
              <Follow
                username={profile?.username}
                isFollowing={profile?.isFollowing}
                incFollowers={incFollowers}
                decFollowers={decFollowers}
                userId={profile?._id}
              />
            )}
          </div>
          <span style={{ fontWeight: "bold" }} className="bold">
            {profile.followingCount}
          </span>{" "}
          following
          {"    "}
          <span className="bold" style={{ fontWeight: "bold" }}>
            {profile.followersCount}
          </span>{" "}
          followers
          {profile?.posts &&
            profile.posts.map((post) => (
              <Tweet key={post._id} post={post} indiv={false} />
            ))}
          {localStorage.getItem("totalProfileFeedLength") != page && (
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              class="w-2/3 h-10 px-5 font-bold mt-5 ml-8 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </Content>
      </Layout>

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

export default Profile;
