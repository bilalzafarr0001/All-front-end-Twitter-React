import {
  EditFilled,
  HomeFilled,
  LogoutOutlined,
  ProfileFilled,
  RadiusSettingOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Space,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { client } from "../components/index";
import { FeedContext } from "../context/FeedContext";
import { UserContext } from "../context/UserContext";
import Suggestion from "./Suggestion/Suggestion";
import TopTrend from "./TopTrend/TopTrend";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const history = useHistory();

  const { publicFeed, setPublicFeed, feed, setFeed, whoFollow, setWhoFollow } =
    useContext(FeedContext);

  const [username] = useState(localStorage.getItem("username"));
  const [textTweet, setTextTweet] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState();

  const [visible1, setVisible1] = useState(false);
  const [size1, setSize1] = useState();

  const { user, setUser } = useContext(UserContext);

  const [fullname, setFullname] = useState(localStorage.getItem("username"));

  const onFinish = (values) => {
    console.log("fullname value", fullname);
    if (!fullname) {
      return toast.error("The Username field should not be empty");
    }
    const body = {
      fullname: fullname,
    };
    client("/users", { values })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("username", fullname);
        history.push(`/`);
      })
      .catch((err) => toast.error(err.message));
    handleOk1();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setWhoFollow(null);
    setPublicFeed(null);
    client("/users").then((response) => {
      setWhoFollow(response.data.filter((user) => !user.isFollowing));
      // console.log("list of side way followers are ", whoFollow);
    });

    client("/users/publicFeed")
      .then((res) => {
        setPublicFeed(res.data);
        console.log("public feed of feedcontext is ", publicFeed);
      })
      .catch((res) => {
        toast.error(res);
      });
  }, []);

  const showLargeDrawer1 = () => {
    setSize1("large");
    setVisible1(true);
  };

  const onClose1 = () => {
    setVisible1(false);
  };

  const showDefaultDrawer = () => {
    setSize("large");
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
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

    const values = {
      caption: cleanedCaption,
    };

    client(`/posts`, { values }).then((res) => {
      const post = res.data;
      post.isLiked = false;
      post.isSaved = false;
      post.isMine = true;
      setFeed([post, ...feed]);
      window.scrollTo(0, 0);
      setTextTweet("");
      toast.success("Tweeted Succesfully");
      success();
    });
  };

  function handleFollow(id) {
    console.log("user ID ", id);
    client(`/users/${id}/follow`);

    // update follow and following
    setTimeout(() => {
      client("/users").then((response) => {
        setWhoFollow(response.data.filter((user) => !user.isFollowing));
      });
    }, 2500);
  }

  return (
    <Sider>
      <Menu
        style={{ width: "19vw", height: "100%" }}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
      >
        <TwitterOutlined
          style={{
            color: "#fff",
            width: "300px",
            fontSize: "60px",

            marginTop: "30px",
            marginBottom: "30px",
          }}
          className="logo"
        />
        <Menu.Item key="1" icon={<HomeFilled />}>
          {" "}
          <Link to={"/"} className="nav-link">
            HOME
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<EditFilled />} onClick={showModal1}>
          EDIT PROFILE
        </Menu.Item>
        <Modal
          title="Edit"
          visible={isModalVisible1}
          onOk={handleOk1}
          onCancel={handleCancel1}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                value={fullname}
                placeholder={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Menu.Item key="3" icon={<ProfileFilled />}>
          <Link to={`${username}`} className="nav-link">
            PROFILE
          </Link>
        </Menu.Item>

        <Menu.Item
          key="4"
          icon={<LogoutOutlined />}
          onClick={() => localStorage.clear()}
        >
          <Link to="/register" className="nav-link">
            LOGOUT
          </Link>
        </Menu.Item>
        <hr
          style={{
            marginLeft: "32px",
            width: "220px",
            color: "white",
            marginTop: "90px",
          }}
        />
        <Button
          type="primary"
          style={{
            marginLeft: "25px",
            marginTop: "100px",

            borderRadius: "50px",
            padding: "5px 20px",
          }}
          onClick={showLargeDrawer1}
        >
          VIEW PUBLIC TWEETS
        </Button>

        <Drawer
          title="PUBLIC TWEETS"
          placement="left"
          size={size}
          width={1200}
          onClose={onClose1}
          visible={visible1}
          extra={
            <Space>
              <Button onClick={onClose1}>Cancel</Button>
              <Button type="primary" onClick={onClose1}>
                OK
              </Button>
            </Space>
          }
        >
          <VerticalTimeline>
            {publicFeed?.map((post) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(33, 150, 243)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(33, 150, 243)",
                }}
                date="2011 - present"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<RadiusSettingOutlined />}
              >
                <Link to={`/${post.user.username}/status/${post._id}`}>
                  <div class="flex">
                    <img
                      class="w-10 h-10 rounded-full mr-4"
                      onClick={() => history.push(`/${user.username}`)}
                      src={post.user?.avatar}
                    />{" "}
                    <h3
                      className="vertical-timeline-element-title"
                      class="font-bold text-grey-900"
                    >
                      {post.user.username}
                    </h3>
                  </div>

                  {post.files ? (
                    <img class="mt-4 w-full" src={post.files} />
                  ) : null}

                  <p class="font-bold text-gray-900">{post.caption}</p>
                </Link>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </Drawer>

        <Button
          type="primary"
          style={{
            marginLeft: "25px",
            marginTop: "20px",
            borderRadius: "50px",
            padding: "5px 45px",
          }}
          onClick={showDefaultDrawer}
        >
          SUGGESTIONS
        </Button>
        <Drawer
          title="Who to Follow"
          placement="right"
          size={size}
          width={550}
          onClose={onClose}
          visible={visible}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={onClose}>
                OK
              </Button>
            </Space>
          }
        >
          <div
            style={{
              width: "30vw",
              padding: "10px",
              marginLeft: "2rem",
              backgroundColor: "#082032",
              borderRadius: "20px",
            }}
          >
            <Suggestion />
            <hr></hr>
            <br></br>
            <br></br>
            <TopTrend />
          </div>
        </Drawer>

        <Button
          type="primary"
          style={{
            marginLeft: "25px",
            marginTop: "20px",
            borderRadius: "50px",
            padding: "5px 74px",
          }}
          onClick={showModal}
        >
          TWEET
        </Button>
        <Modal
          title="Post a Tweet"
          visible={isModalVisible}
          onOk={handleSubmitPost}
          onCancel={handleCancel}
        >
          <TextareaAutosize
            rows="100"
            placeholder="What's happening?"
            type="text"
            type="text"
            style={{ border: "none", width: "400px", height: "170px" }}
            onChange={(e) => setTextTweet(e.target.value)}
            value={textTweet}
          />
        </Modal>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
