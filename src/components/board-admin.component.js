import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import AuthService from "../services/auth.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/login"});
    else if (!["admin"].includes(user.role)) this.setState({ redirect: "/home" })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Admin Board</h3>
        </header>
      </div>
    );
  }
}
