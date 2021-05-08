import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/login"});
    else if (!["moderator", "admin"].includes(user.role)) this.setState({ redirect: "/home"});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Moderator Board</h3>
        </header>
      </div>
    );
  }
}
