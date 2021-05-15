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

import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  handleClick = e => {
    console.log('click ', e);
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
    const { currentUser, showModeratorBoard, showAdminBoard} = this.state;

    return (
      <div>
        <Layout className="layout">
          <Menu onClick={this.handleClick} defaultSelectedKeys={['home']} mode="horizontal">
            <Menu.Item key="home">
              <Link to={"/"}>
                MathSolver 
              </Link>
            </Menu.Item>
            <SubMenu key="SubMenu" title="Giải toán cơ bản">
              <Menu.Item key="poly">
                <Link to={"/general1"}>
                  Dạng toán Đa thức
                </Link>
              </Menu.Item>
              <Menu.Item key="graph">
                <Link to={"/general2"}>
                  Dạng toán Đồ thị
                </Link>
              </Menu.Item>
            </SubMenu>
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
          
        </Layout>
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

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/general" component={BoardUser} />
            <Route path="/general1" component={General1}/>
            <Route path="/general2" component={General2}/>
            <Route path="/general3" component={General3}/>
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            {/* <Route path="*" component={Home} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
