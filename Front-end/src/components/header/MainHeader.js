import React, { Component } from "react";
import Header from "./header";
import { Container, Button } from "react-bootstrap";
import {
  log_out_customer,
  clean,
} from "../../actions/customer/customerAuthAction";
import { connect } from "react-redux";
import "../../componentsCss/searchBar.css";

class MainHeader extends Component {
  LogOut = () => {
    this.props.log_out_customer();
  };
  clean = () => {
    this.props.clean();
  };
  render() {
    return (
      <div>
        <Container fluid className="header-backgorund-color">
          <div className="container-resize">
            <Header />
          </div>
        </Container>
        <Container fluid>
          <Button onClick={this.LogOut}> Log Out</Button>
          <Button onClick={this.clean}> clean</Button>
        </Container>
      </div>
    );
  }
}

export default connect(null, {
  log_out_customer,
  clean,
})(MainHeader);
