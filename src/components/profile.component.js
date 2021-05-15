import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

import { Popover, Button } from "antd";

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
          <h3><strong>{currentUser.email}</strong></h3>
          <h5>UserName</h5>
          <Popover content={token} title="Token">
            <Button type="primary">Token</Button>
          </Popover>
        </div> : null}
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
