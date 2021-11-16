import { Avatar, Button } from "antd";
import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation as locations } from "react-router-dom";
import home from "../../Animation/loading.json";
import { client } from "../../components/index";
import { FeedContext } from "../../context/FeedContext";
import LottieAnimation from "../../Lottie";

function FollowSuggestion({ user, list }) {
  const history = useHistory();
  const { feed, setFeed, whoFollow, setWhoFollow } = useContext(FeedContext);
  const [loading, setLoading] = useState(false);
  let router = locations();

  const handleFollow = () => {
    client(`/users/${user._id}/follow`);
    setLoading(true);
    // update follow and following
    setTimeout(() => {
      client("/users").then((response) => {
        setWhoFollow(response.data.filter((user) => !user.isFollowing));
      });
    }, 2500);
  };

  return (
    <>
      {loading && <LottieAnimation lotti={home} height={100} width={100} />}

      <div class="flex justify-between">
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
            {list ? (
              <h3 class="font-bold text-grey-800">{user.username}</h3>
            ) : (
              <h3 class="font-bold text-white">{user.username}</h3>
            )}
          </Link>
        </div>

        <Button
          style={{ marginLeft: "10px", fontWeight: "bold" }}
          type="primary"
          onClick={() => handleFollow()}
        >
          Follow
        </Button>
      </div>

      <br></br>

      {list ? (
        <hr style={{ color: "#222", width: "140px", marginLeft: "35px" }}></hr>
      ) : (
        <hr style={{ color: "white", width: "140px", marginLeft: "35px" }}></hr>
      )}

      <br></br>
    </>
  );
}

export default FollowSuggestion;
