import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import General1 from "./components/general-1.component"
import General2 from "./components/general-2.component";
import General3 from "./components/general-3.component";

import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';

import { HomeOutlined, FunctionOutlined, EditOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Content, Sider, Header, Footer } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      collapsed: false,
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      current: ''
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.role.includes("moderator") || user.role.includes("admin"),
        showAdminBoard: user.role.includes("admin"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, current } = this.state;

    return (

        <Layout className="layout" >
          <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal"  style={{padding: "0 150px"}}>
            <Menu.Item key="home">
              <Link to={"/"}>
                MathSolver 
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={"/solve"}>
                Giải
              </Link>
            </Menu.Item>
            <Menu.Item key="problem">
              <Link to={"/general3"}>
                Giải tổng hợp
              </Link>
            </Menu.Item>
            {showModeratorBoard && (
              <Menu.Item key="define">
                Định nghĩa bài toán
              </Menu.Item>
            )}
            {showAdminBoard && (
              <Menu.Item key="monitor">
                Quản lý
              </Menu.Item>
            )}
            
            {currentUser ? (
              <Menu.Item style={{float: 'right'}}>
                <a href="/" onClick={this.logOut}></a>
                Đăng xuất
              </Menu.Item>
            ) : (
              <Menu.Item key="login" style={{float: 'right'}}>
                <Link to={"/login"}>
                  Đăng nhập
                </Link>
              </Menu.Item>
            )}
            {currentUser && (
              <Menu.Item key="profile" style={{float: 'right'}}>
                <Link to={"/profile"}>
                  {currentUser.email}
                </Link>

              </Menu.Item>
            )}
          </Menu>
        {/* <style={{ minHeight: '100vh' }}> */}
        {/* <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="polynomial" icon={<FunctionOutlined/>}>
                Đa thức
              </Menu.Item>
              <Menu.Item key="graph" icon={<EditOutlined/>}>
                Đồ thị
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ "background": "#fff"}}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined: MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
            </Header> */}
    
        {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            MathSolver
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {(
              <li className="nav-item">
                <Link to={"/general"} className="nav-link">
                  General 
                </Link>
              </li>
            )}

            {(
              <li className="nav-item">
                <Link to={"/general1"} className="nav-link">
                  Gen 1
                </Link>
              </li> 
            )}

            {(
              <li className="nav-item">
                <Link to={"/general2"} className="nav-link">
                  Gen 2
                </Link>
              </li> 
            )}

            {(
              <li className="nav-item">
                <Link to={"/general3"} className="nav-link">
                  Gen 3
                </Link>
              </li> 
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav> */}

        {/* <div className="container mt-3"> */}
          <Layout style={{padding: "0 150px"}}>
            <Content style={{ minHeight: '80vh', background: "#fff"}}>
              <Row style={{display: "block"}}> 
                <Col>
                  <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/profile" component={Profile} />
                    {/* <Route path="/solve" component={General1} /> */}
                    <Route path="/solve" component={BoardUser} />
                    <Route path="/solve/polynomial" component={General1}/>
                    <Route path="/solve/graph" component={General2}/>
                    <Route path="/general3" component={General3}/>
                    <Route path="/mod" component={BoardModerator} />
                    <Route path="/admin" component={BoardAdmin} />
                    {/* <Route path="*" component={Home} /> */}
                  </Switch>
                </Col>
              </Row>

            </Content>
          </Layout>
            <Footer style={{ textAlign: 'center' }}>Math</Footer>
    </Layout>
    );
  }
}

export default App;
