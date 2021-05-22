import React, { Component } from "react";


import { Form, Input, Button, Typography} from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";


import AuthService from "../services/auth.service";
import { Redirect } from "react-router";

const { Text } = Typography;


export default class Login extends Component {
  constructor(props) {
    super(props);

  this.enterLoading = this.enterLoading.bind(this);

    this.state = {

      validateStatus: false,
      loading: false,
      message: ""
  }

  

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

      AuthService.login(values.email, values.password).then(
        () => {

          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            error.response.status == 401? "Email hoặc mật khẩu không đúng!":
            error.toString();
              console.log(error.response);
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
  }

  enterLoading = index => {
      this.setState(( {loading }) => {
        return {
          loading: true,
          message: ""
        };
      });
  }


  render() {
    return (
      <Form
        name="login"
        className="login-form"
        onFinish={this.onFinish}
        >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Email is required!",
            },
            {
              type: "email",
              message: "The input is not valid email!", 
            }
          ]}>
          <Input 
            prefix={<UserOutlined/>}
            placeholder="E-mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required!"
            }
          ]}
          >
          <Input.Password
            prefix={<KeyOutlined/>}
            type="password"
            placeholder="Password"/>
        </Form.Item>
        
        <Form.Item>
          <Button className="login-form-button" type="primary" htmlType="submit" loading={this.state.loading} >
            Đăng nhập 
          </Button>
        </Form.Item>
          {this.state.message && (
            <Text type="danger">{this.state.message}</Text>
          )}
        </Form>
        
    );
  }
}
