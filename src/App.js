import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Logup from "./components/Logup";
import Home from "./components/Home";
import Profile from "./components/profile.component";
// import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";
// import General1 from "./components/general-1.component";
import ExerciseComponent from "./components/Exercise";
import Polynomial from "./components/Polynomial";
import Problem from "./components/Problem";
// import MathSolver from "./components/breadcrumb.component";
import Graph from "./components/Graph";
import MonitorComponent from "./components/Monitor";
import FooterContent from "./footer/footer"


import { withRouter } from "react-router";

import { Layout, Menu, Drawer, Button } from "antd";

import {
  // HomeOutlined,
  // FunctionOutlined,
  // EditOutlined,
  // MenuUnfoldOutlined,
  // MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { SubMenu } = Menu;

const keyMap = {
  "/": "home",
  // "/profile": "profile",
  "/polynomial": "polynomial",
  "/graph": "graph",
  "/problem": "problem",
  "/define": "define",
  "/monitor": "monitor"
}
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      current: undefined,
      loginVisible: false,
      profileVisible: false,
      logupVisible: false
    };
  }

  showLogin = () => {
    this.setState({
      loginVisible: true,
    });
  }; 

  showLogup = () => {
    this.setState({
      logupVisible: true,
    });
  }; 

  showProfile = () => {
    this.setState({
      profileVisible: true,
    })
  }
  
  onclose = () => {
    this.setState({
      loginVisible: false,
      logupVisible: false,
      profileVisible: false
    });
  };

  handleClick = e => {
    // console.log('click ', e);
    this.setState({ current: e.key });
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard:
          user.role.includes("moderator") || user.role.includes("admin"),
        showAdminBoard: user.role.includes("admin"),
      });
    }
  }

  logOut() {
    AuthService.logout().then(this.setState({ current: "home" }));
  }



  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } =
      this.state;
    const { pathname } = this.props.location;
    return (
      <>
      <Layout className="layout">
        <Menu
          onClick={this.handleClick}
          selectedKeys={keyMap[pathname]}
          mode="horizontal"
          triggerSubMenuAction="click"
          style={{ padding: "0 150px" }}
        >
          <Menu.Item key="home">
            <Link to={"/"}>MathSolver</Link>
          </Menu.Item>
          {/* <Menu.Item>
              <Link to={"/solve"}>
                Giải cơ bản
              </Link>
            </Menu.Item> */}
          <SubMenu key="solve" title="Giải cơ bản">
            <Menu.Item key="polynomial">
              <Link to={"/polynomial"}>Đa thức</Link>
            </Menu.Item>
            <Menu.Item key="graph">
              <Link to={"/graph"}>Đồ thị</Link>
            </Menu.Item>
            <Menu.Item key="exercise">
              <Link to={"/exercise"}>Bài tập</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="problem">
            <Link to={"/problem"}>Bài toán Thực tế</Link>
          </Menu.Item>
          {showModeratorBoard && (
            <Menu.Item key="define">
              <Link to={"/define"}>Định nghĩa bài toán</Link>
            </Menu.Item>
          )}
          {showAdminBoard && (
            <Menu.Item key="monitor">
              <Link to={"/monitor"}>Quản lý</Link>
            </Menu.Item>
          )}
          
          {currentUser ? (
            <Menu.Item key="logout" className="app_unhover" style = {{float: "right", margin: "0px 0px"}}>
            <Button
              className="nav-button"
              shape="round"
              type="primary"
              href="/"
              onClick={this.logOut}
              
            >
              Đăng xuất
            </Button>
            </Menu.Item>
          ) : (
            <>
            <Menu.Item key="logup" className="app_unhover" style = {{float: "right", margin: "0px 0px"}}>
            <Button
              className="nav-button"
              shape="round"
              type="primary"
              onClick={this.showLogup}
              key = "logup"
            >
              Đăng Ký
            </Button>
            </Menu.Item>
            <Menu.Item key="login" className="app_unhover" style = {{float: "right", margin: "0px 0px"}}>
            <Button
            className="nav-button"
            shape="round"
            type="primary"
            onClick={this.showLogin}
            >
            Đăng nhập
            </Button>
            </Menu.Item>
            </>
          )}
          {currentUser && (
            <Menu.Item key="profile" className="app_unhover" style = {{float: "right", margin: "0px 0px"}}>
            <Button
              className="nav-button"
              shape="round"
              type="dashed"
              onClick={this.showProfile}
              icon={<UserOutlined />}
              
            >
              {currentUser.email}
            </Button>
            </Menu.Item>
          )}
        </Menu>
       
        <Layout className="body" style={{ padding: "0 150px" }}>
          {/* <MathSolver style={{margin: "16px"}}></MathSolver> */}
          <Drawer
            title="Đăng nhập"
            width={480}
            onClose={this.onclose}
            visible={this.state.loginVisible}
          >
            <Login></Login>
          </Drawer>

          <Drawer
            title="Đăng ký"
            width={480}
            onClose={this.onclose}
            visible={this.state.logupVisible}
          >
            <Logup></Logup>
          </Drawer>

          <Drawer
            title="Thông tin người dùng"
            width={480}
            onClose={this.onclose}
            visible={this.state.profileVisible}
          >
            <Profile></Profile>
          </Drawer>
          {/* {pathname=="/login"?
            <Row style={{minHeight: '80vh'}}>
            <Col span={8}></Col>
            <Col span={8}>
              <Switch>
                <Route exact path="/login" component={Login}/>
              </Switch>
            </Col>
            <Col span={8}></Col>
              
            </Row>
            : */}
          <Content>
            <Switch>
              <Route exact path={"/"} component={Home} />
              {/* <Route exact path="/login" component={Login} /> */}
              {/* <Route exact path="/profile" component={Profile} /> */}
              <Route path="/polynomial" component={Polynomial} />
              {/* <Route path="/polynomial" component={General1}/> */}
              <Route path="/exercise" component={ExerciseComponent} />
              <Route path="/graph" component={Graph} />
              <Route path="/problem" component={Problem} />
              <Route path="/define" component={BoardModerator} />
              <Route path="/monitor" component={MonitorComponent} />
              {/* <Route path="*" component={Home} /> */}
            </Switch>
          </Content>
          {/* } */}
        </Layout>
      </Layout>
      <FooterContent></FooterContent>
      </>
    );
  }
}

export default withRouter(App);
