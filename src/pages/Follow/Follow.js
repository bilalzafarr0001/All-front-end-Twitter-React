import React, { useState, useEffect, useContext } from "react";
import { useLocation as locations } from "react-router-dom";
import { Button } from "antd";
import { client } from "../../components/index";
import { FeedContext } from "../../context/FeedContext";

const Follow = ({
  isFollowing,
  incFollowers,
  decFollowers,
  userId,
  username,
}) => {
  let router = locations();
  const { feed, setFeed, whoFollow, setWhoFollow } = useContext(FeedContext);

  const [followingState, setFollowingState] = useState(isFollowing);

  useEffect(() => setFollowingState(isFollowing), [isFollowing]);

  const handleFollow = () => {
    if (followingState) {
      setFollowingState(false);
      if (decFollowers) {
        decFollowers();
      }
      client(`/users/${userId}/unfollow`);
    } else {
      setFollowingState(true);
      if (incFollowers) {
        incFollowers();
      }
      client(`/users/${userId}/follow`);

      //
      if (router.pathname === "/" && username) {
        client(`/users/${username}`)
          .then((res) => {
            setFeed([...res.data.posts, ...feed]);
          })
          .catch((err) => console.log(err));
      }
    }

    // update follow and following
    setTimeout(() => {
      client("/users").then((response) => {
        setWhoFollow(response.data.filter((user) => !user.isFollowing));
      });
    }, 2500);
  };

  if (isFollowing) {
    return (
      <Button type="primary" onClick={() => handleFollow()}>
        Following
      </Button>
    );
  } else {
    return (
      <Button type="primary" onClick={() => handleFollow()}>
        Follow
      </Button>
    );
  }
};

export default Follow;
