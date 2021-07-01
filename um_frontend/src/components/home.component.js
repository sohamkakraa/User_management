import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container" >
        <header className="jumbotron">
          <h3>Welcome To World's Best</h3>
          <h3>User Management</h3>
          <h3>System.</h3>
        </header>
        <body className="Arial">
            <p></p>
        </body>
      </div>
    );
  }
}