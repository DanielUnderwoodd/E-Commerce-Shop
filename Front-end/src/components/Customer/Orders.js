import React, { Component, useState } from "react";
import { Container } from "react-bootstrap";

import { connect } from "react-redux";
// import CarouselCustom from "../../config/CarouselCustom";
// import ECommerceCard from "../ECommerceCard";
// import shortid from "shortid";
import { Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import "../../componentsCss/Slider.css";
import { get_orders } from "../../actions/customer/ordersAction";
import NavigationSideBar from "./NavigationSideBar";

class Orders extends Component {

  constructor(props) {
    debugger;
    super();

    this.state = { 
      list: []
    };

    this.customer = props.customer;
    this.listUpdater = this.listUpdater.bind(this);
  }

  listUpdater(data) {
    this.setState({list: data});
  };

  componentDidMount() {
    this.props.get_orders(this.listUpdater, this.customer.email);
  }

  render() {

    return (
      <div>
        <Container className="profile-section">
          <Row>
            <Col md={4}>
              <NavigationSideBar />
            </Col>
            <Col xs={12} md={8}>
            <ListGroup>
        
          {this.state.list.map((item, i) => {
      return (
        <ListGroup.Item>
          
          <table width="100%" border="1">
            <tr>
              <td><div>{item.products}</div></td>
              <td>products</td>
            </tr>
            <tr>
              <td><div>{item.totalPrice}</div></td>
              <td>Total Price</td>
            </tr>
            <tr>
              <td><div>{item.productsCount}</div></td>
              <td>Total Number</td>
            </tr>
            <tr>
              <td><div>{item.address}</div></td>
              <td>Related Address</td>
            </tr>
          </table>
        </ListGroup.Item>
      );
    })}
           </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  debugger;
  const { _public } = state;

  return {
    orders: get_orders,
    customer: state.customer,
  };
};

export default connect(mapPropsToState, {
  get_orders,
})(Orders);
