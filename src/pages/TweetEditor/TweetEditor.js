import { FileAddFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { client, uploadImage } from "../../components/index";
import { FeedContext } from "../../context/FeedContext";

export default function TweetEditor() {
  const { feed, setFeed } = useContext(FeedContext);

  const [textTweet, setTextTweet] = useState("");

  const handleUploadImage = (e) => {
    const { files } = document.querySelector('input[type="file"]');
    console.log("Image file", files[0]);
    uploadImage(e.target.files[0]).then((res) => {
      // console.log("image url with response is ", res.url);
      localStorage.setItem("URL", res.url);
    });
  };

  const success = () => {
    message.success("Tweet Posted Successfully !");
  };
  const handleSubmitPost = () => {
    if (!textTweet) {
      return toast.error("Please write something");
    }

    const cleanedCaption = textTweet
      .split(" ")
      .filter((caption) => !caption.startsWith("#"))
      .join(" ");
    console.log(
      "value of url inside submit function is",
      localStorage.getItem("URL")
    );
    const values = {
      caption: cleanedCaption,
      files: localStorage.getItem("URL") ? localStorage.getItem("URL") : null,
    };
    console.log("values", values);
    client(`/posts`, { values }).then((res) => {
      const post = res.data;
      post.isLiked = false;
      post.isSaved = false;
      post.isMine = true;
      setFeed([post, ...feed]);
      window.scrollTo(0, 0);
      setTextTweet("");
      localStorage.removeItem("URL");
      toast.success("Tweeted Succesfully");
      success();
    });
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div class="flex items-center border-b border-blue-500 ">
        <img
          class="w-12 h-12 rounded-full"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
        />
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="What's happening?"
          onChange={(e) => setTextTweet(e.target.value)}
          value={textTweet}
        />
      </div>
      <label for="file" style={{ marginLeft: "30px", marginTop: "30px" }}>
        <FileAddFilled style={{ fontSize: "28px", color: "dodgerblue" }} />
        <input
          type="file"
          id="file"
          onChange={handleUploadImage}
          style={{ display: "none" }}
          name="image"
          accept="image/*"
          multiple=""
          data-original-title="upload photos"
        />
      </label>

      <Button
        type="primary"
        style={{ borderRadius: "50px", padding: "5px 45px", marginTop: "2%" }}
        onClick={handleSubmitPost}
      >
        Tweet
      </Button>
    </div>
  );
}
