import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

import { Popover, Button, Avatar, Row, Col, Typography, Divider } from "antd";
import { UserOutlined, MailOutlined, EnvironmentOutlined, UnlockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { email: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    const token = (
      <div>
        <p><b>Access: </b> {currentUser.access}</p>
        <p><b>Refresh: </b> {currentUser.refresh}</p>
      </div>
    )
    return (
      <div>
        {this.state.userReady ? 
        <div>
        <Row type="flex" style={{justifyContent: 'center'}}>
          <Avatar shape="square" size={200} icon={<UserOutlined />}></Avatar>
        </Row>
        {/* <Row type="flex" style={{justifyContent: 'center'}}> */}
            {/* <h1><strong>{(currentUser.first_name + " " + currentUser.last_name).toUpperCase()}</strong></h1> */}
        {/* </Row> */}
        <Divider >
        {(currentUser.first_name + " " + currentUser.last_name).toUpperCase()}</Divider>
        <Row>
        <Col>
            <MailOutlined/>
        </Col>
          <Col span={8}>
            <b>E-mail:</b>
          </Col>
          <Col>
            <Text>{currentUser.email}</Text>
          </Col>
            {/* {currentUser.avatar ? null : <Avatar shape="square" size={64} icon={<UserOutlined />}></Avatar>}
          </Col>
          {/* <Col >
            <p><b>Họ và Tên: </b> {currentUser.first_name.normalize() + " " + currentUser.last_name}</p>
            <p><b>Trường: </b> {!currentUser.work_address ? "Chưa có" : currentUser.work_address} </p>
            <p><b>Vai trò: </b> {currentUser.role}</p>
            
          </Col> */}

        </Row> 
        <Row>
          <Col>
            <EnvironmentOutlined/>
          </Col>
          <Col span={8}>
            <b>Nơi công tác:</b>
          </Col>
          <Col>
            <Text> {!currentUser.work_address ? "Chưa cập nhật": currentUser.work_address}</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <UnlockOutlined/>
          </Col>
          <Col span={8}>
            <b>Vai trò:</b>
          </Col>
          <Col>
            <Text>{currentUser.role}</Text>
          </Col>
        </Row>
        <Divider></Divider>
        <Row type="flex" >
          <Popover content={token} title="Token" style={{justify: 'right'}}>
              <Button type="primary">Token</Button>
            </Popover>
        </Row>
       </div>
        : null}
      </div>
      // <div className="container">
      //   {(this.state.userReady) ?
      //   <div>
      //   <header className="jumbotron">
      //     <h3>
      //       <strong>{currentUser.email}</strong> Profile
      //     </h3>
      //   </header>
      //   <p>
      //     <strong>Token:</strong>{" "}
      //     {currentUser.access.substring(0, 20)} ...{" "}
      //     {currentUser.access.substr(currentUser.access.length - 20)}
      //   </p>
      //   <strong>Authorities:</strong>
      //   <ul>
      //     {currentUser.role}
      //       {/* currentUser.role.map((role, index) => <li key={index}>{role}</li>)} */}
      //   </ul>
      // </div>: null}
      // </div>
    );
  }
}
