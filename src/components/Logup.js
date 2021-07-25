import React, { Component } from "react";

import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import AuthService from "../services/auth.service";
import { withRouter } from "react-router";

// const { Text } = Typography;

class Login extends Component {
  constructor(props) {
    super(props);

    this.enterLoading = this.enterLoading.bind(this);

    this.state = {
      validateStatus: false,
      loading: false,
      message: "",
      popup: false,
    };
  }
  componentDidMount() {
    let user = AuthService.getCurrentUser();
    if (user !== null) {
      this.logOut();
      window.location.reload();
    }
  }
  logOut() {
    AuthService.logout();
  }

  onFinish = (values) => {
    this.setState({
      loading: true,
      message: "",
    });
    // console.log(values);
    AuthService.register(
      values.email,
      values.first_name,
      values.last_name,
      values.password,
      values.re_password
    );
    // .then(
    //   () => {

    //     // this.props.history.push("/");
    //     // window.location.reload();
    //   },
    //   error => {
    //     let resMessage;
    //     //   error.response.status == 401? "Email hoặc mật khẩu không đúng!":
    //     //   error.toString();
    //     if (error.response.status === 401) resMessage = "E-mail hoặc mật khẩu không chính xác!";
    //     else if (error.response.status === 500) resMessage = "Không thể kết nối đến máy chủ!";
    //     else resMessage = error.toString();
    //     this.setState({
    //       loading: false,
    //       message: resMessage,
    //       popup: true,
    //     });
    //   }
    // );
  };

  error = () => {
    // notification.open({
    // description: this.state.message,
    // });
    message.error({
      content: this.state.message,
      style: { float: "right" },
    });
    this.setState({ message: "" });
  };

  enterLoading = (index) => {
    this.setState(({ loading }) => {
      return {
        loading: true,
        message: "",
      };
    });
  };

  create_user() {
    AuthService.register("1", "2", "3");
  }

  render() {
    return (
      <Form name="login" className="login-form" onFinish={this.onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Hãy nhập e-mail!",
            },
            {
              type: "email",
              message: "E-mail không đúng!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="first_name"
          rules={[
            {
              required: true,
              message: "Hãy nhập Tên!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Tên người dùng"
          />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[
            {
              required: true,
              message: "Hãy nhập Họ!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Họ người dùng"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item
          name="re_password"
          rules={[
            {
              required: true,
              message: "Hãy nhập lại mật khẩu!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </Form.Item>
        {/* <Button onClick={() => this.create_user()}>Create</Button> */}
        <Form.Item>
          <Button
            className="login-form-button"
            type="primary"
            htmlType="submit"
            loading={this.state.loading}
          >
            Đăng ký
          </Button>
        </Form.Item>
        {this.state.message && this.error()}
      </Form>
    );
  }
}

export default withRouter(Login);
