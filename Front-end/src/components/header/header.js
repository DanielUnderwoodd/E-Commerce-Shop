import React, { Component } from "react";
import RegisterForm from "../registerProccess/RegisterForm";
import Authenticate from "./Authenticate";
import Sidebar from "../Sidebar";
import SearchProvider from "../../provider/SearchProvider";

import { connect } from "react-redux";
import { Col, Row, Form, InputGroup, Button } from "react-bootstrap";
import "../../componentsCss/header.css";
import SidebarContent from "../SidebarContent";
import SearchBar from "./SearchBar";
import Cart from "../Cart";
class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
      didUpdate: false,
      isOpen: false,
      overflow: true,
    };
  }
  setModalShow = () => {
    this.setState({
      modalShow: true,
    });
  };
  setModalHide = () => {
    this.setState({
      modalShow: false,
    });
  };
  toggleSidebar = () => {
    this.setState((preState) => ({
      isOpen: !preState.isOpen,
    }));
  };
  componentDidUpdate() {
    if (this.state.didUpdate === false) {
      if (this.props.isLogIn) {
        this.setState({
          modalShow: false,
          didUpdate: true,
        });
      }
    }
  }

  render() {
    let { isOpen } = this.state;
    let { cart } = this.props;
    return (
      <div className="header-navabr">
        {cart.length > 0 && (
          <Sidebar isOpen={isOpen}>
            <SidebarContent
              toggleSidebar={this.toggleSidebar}
              setLoginModal={this.setModalShow}
            />
          </Sidebar>
        )}
        <Row className="align-items-center">
          <Cart toggleSidebar={this.toggleSidebar} cart={cart} />

          {this.props.isLogIn ? (
            <Authenticate />
          ) : (
            <Col className="col-align">
              <Button className="register" onClick={this.setModalShow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16">
                  <g id="account-icon" transform="translate(-453 -562)">
                    <path
                      id="Icon"
                      d="M0,16V14c0-2.2,3.6-4,8-4s8,1.8,8,4v2ZM4,4A4,4,0,1,1,8,8,4,4,0,0,1,4,4Z"
                      transform="translate(453 562)"
                      fill="#ff6a00"
                    />
                  </g>
                </svg>
                ورود/عضویت
              </Button>
            </Col>
          )}
          <Col className="col-align" xs={7}>
            <Form inline className="search-bar d-inline w-50">
              <InputGroup>
                <SearchProvider>
                  <SearchBar />
                </SearchProvider>
              </InputGroup>
            </Form>
          </Col>
          <Col>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="76"
              height="71"
              viewBox="0 0 76 71">
              <path
                id="open_map"
                d="M50.333,7.55C50.333,5.589,47.5,4,44,4s-6.333,1.589-6.333,3.55c0,1.645,2.111,16.174,2.111,17.159,0,1.306,1.889,2.366,4.222,2.366s4.222-1.06,4.222-2.366C48.222,23.724,50.333,9.2,50.333,7.55ZM37.666,71.45C37.666,73.411,40.5,75,44,75s6.333-1.589,6.333-3.55c0-1.645-2.111-16.174-2.111-17.159,0-1.306-1.889-2.366-4.222-2.366s-4.222,1.06-4.222,2.366C39.778,55.276,37.666,69.8,37.666,71.45ZM14,18.532c-2.02-.98-5.075.289-6.823,2.836s-1.531,5.407.49,6.386c1.7.824,17.714,6.55,18.729,7.041,1.347.653,3.382-.193,4.549-1.89s1.02-3.605-.327-4.258C29.606,28.154,15.7,19.354,14,18.532ZM74,60.468c2.02.98,5.075-.289,6.823-2.836s1.531-5.407-.49-6.386c-1.7-.824-17.714-6.55-18.729-7.041-1.347-.653-3.382.193-4.549,1.89s-1.02,3.605.327,4.258C58.393,50.846,72.3,59.646,74,60.468Zm0-41.936c2.02-.98,5.075.289,6.823,2.836s1.531,5.407-.49,6.386c-1.7.824-17.714,6.55-18.729,7.041-1.347.653-3.382-.193-4.549-1.89s-1.02-3.605.327-4.258C58.393,28.154,72.3,19.354,74,18.532ZM14,60.468c-2.02.98-5.075-.289-6.823-2.836s-1.531-5.407.49-6.386c1.7-.824,17.714-6.55,18.729-7.041,1.347-.653,3.382.193,4.549,1.89s1.02,3.605-.327,4.258C29.606,50.846,15.7,59.646,14,60.468Z"
                transform="translate(-6 -4)"
                fill="#ff6a00"
              />
            </svg>
          </Col>
        </Row>
        <RegisterForm show={this.state.modalShow} onHide={this.setModalHide} />
      </div>
    );
  }
}
const mapPropsToState = (state) => {
  const { auth, _public } = state;
  return {
    isLogIn: auth.isLogIn,
    cart: _public.cart,
  };
};

export default connect(mapPropsToState, {})(Header);
