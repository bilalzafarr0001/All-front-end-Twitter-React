import React, { useContext, useEffect } from "react";
import { FeedContext } from "../../context/FeedContext";
import { client } from "../../components/index";
import FollowSuggestion from "./FollowSuggestion";
import { Link, useHistory } from "react-router-dom";
import { Divider } from "antd";

function Suggestion() {
  const { whoFollow, setWhoFollow } = useContext(FeedContext);
  const history = useHistory();

  useEffect(() => {
    setWhoFollow(null);

    client("/users").then((response) => {
      setWhoFollow(response.data.filter((user) => !user.isFollowing));
      //console.log("list of side way followers are ", whoFollow);
    });
  }, []);
  return (
    <div>
      <h1 class="font-bold text-2xl text-white py-3 px-3">Who to follow</h1>
      <Divider />
      <div>
        {whoFollow?.slice(0, 4).map((user) => (
          <FollowSuggestion key={user._id} user={user} list={false} />
        ))}
      </div>
      {whoFollow?.length <= 4 ? null : (
        <button
          onClick={() => history.push("/lists")}
          class="ml-8 bg-transparent hover:bg-white text-white font-semibold hover:text-gray-800 py-1 px-10 border border-white hover:border-transparent rounded-full"
        >
          More
        </button>
      )}
      <br></br>
      <br></br>
      <div style={{ textAlign: "center" }}>
        {whoFollow?.length === 0 && "You have More Followers!"}
      </div>
    </div>
  );
}

export default Suggestion;
