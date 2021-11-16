import { Button, Card, Layout, message } from "antd";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { client, uploadImage } from "../../components/index";
import { UserContext } from "../../context/UserContext";
import Sidebar from "../Sidebar";
import Suggestion from "../Suggestion/Suggestion";
import TopTrend from "../TopTrend/TopTrend";

const { Header, Sider, Content } = Layout;

function EditProfile() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const [fullname, setfullname] = useState(localStorage.getItem("username"));

  const success = () => {
    message.success("Profile Updated Successfully !");
  };

  const handleSubmitPost = () => {
    console.log("fullname value", fullname);
    if (!fullname) {
      return toast.error("The Username field should not be empty");
    }

    const values = {
      fullname: fullname,
      avatar: localStorage.getItem("AVATAR_URL"),
    };
    console.log("values", values);
    client(`/users`, { values })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("username", fullname);
        localStorage.removeItem("AVATAR_URL");
        toast.success("Tweeted Succesfully");
        success();
        history.push(`/`);
      })
      .catch((err) => toast.error(err.message));
  };

  const handleUploadImage = (e) => {
    const { files } = document.querySelector('input[type="file"]');
    console.log("Image file", files[0]);
    uploadImage(e.target.files[0]).then((res) => {
      console.log("image avatar url with response is ", res.url);
      localStorage.setItem("AVATAR_URL", res.url);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <Sidebar />
      <Layout
        className="site-layout"
        style={{
          height: "100vh",

          marginLeft: "7rem",
        }}
      >
        <Content
          className="site-layout-background"
          style={{
            margin: " 24px 16px",
            padding: 24,
            width: "53rem",
            marginTop: "5rem",
          }}
        >
          {" "}
          <div className="site-card-border-less-wrapper">
            <Card
              title="Card title"
              bordered={false}
              style={{ width: 600, height: "400px" }}
            >
              <div class="flex items-center border-b border-blue-500 py-6">
                <input
                  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="What's happening?"
                  onChange={(e) => setfullname(e.target.value)}
                  value={fullname}
                />
              </div>

              <div style={{ margin: "60px" }}>
                <label
                  for="file"
                  style={{ marginLeft: "30px", marginTop: "30px" }}
                >
                  Upload Avatar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
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
              </div>
              <Button
                type="primary"
                style={{ borderRadius: "50px", padding: "5px 40px" }}
                onClick={handleSubmitPost}
              >
                Confirm
              </Button>
            </Card>
          </div>
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

export default EditProfile;
