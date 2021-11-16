import { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { client } from "./index";
import { Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image } from "antd";
import LottieAnimation from "../Lottie";
import home from "../Animation/loadingDots.json";

class Register extends Component {
  constructor() {
    super();
    this.onFinish = this.onFinish.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      user: {},
      loading: false,
    };
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  goToLogin = () => {
    return <Redirect to="/login" />;
  };
  onFinish = async (values) => {
    //console.log(`Name: ${this.state.username}`);
    // console.log(`Email: ${this.state.password}`);
    try {
      const { token } = await client("/auth/signup", { values });
      this.setState({ loading: true });

      localStorage.setItem("token", token);
    } catch (err) {
      console.log("Responce from signup is ", err.msg);
      toast.error(err.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const user = await client("/auth/me");
    this.setState({ user: user.data });

    localStorage.setItem("user", JSON.stringify(user.data));
    localStorage.setItem("username", this.state.username);
    console.log("Received values of form: ", values);
    this.setState({ username: "", password: "" });

    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <ToastContainer />
        {this.state.loading && (
          <LottieAnimation lotti={home} height={600} width={600} />
        )}
        <Form
          style={{ width: "400px", margin: "160px auto" }}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Image
            style={{ marginLeft: "60px" }}
            width={220}
            src="https://www.apacph.org/wp/wp-content/uploads/2014/03/Twitter-Logo-New-.png"
          />
          <h2 style={{ marginLeft: "100px", fontWeight: "bold" }}>
            Register User
          </h2>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                borderRadius: "30px",
                fontWeight: "bold",
                padding: "5px 50px ",
                marginLeft: "130px",
              }}
            >
              Sign Up
            </Button>
            <br></br>
            <br></br>
            <Button
              type="success"
              htmlType="submit"
              className="login-form-button"
              style={{
                borderRadius: "30px",
                fontWeight: "bold",
                padding: "5px 58px ",
                marginLeft: "130px",
              }}
            >
              <Link to="/login">Login</Link>
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Register;
