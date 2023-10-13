import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown";
import { connect } from "react-redux";
import {
  send_code_again,
  submit_sign_in,
  submit_sign_up,
} from "../../actions/customer/customerRegisterAction";
class RegisterFormFooter extends Component {
  constructor() {
    super();
    this.state = {
      disableButton: true,
    };
  }

  renderer({ seconds }) {
    return <span> برای ارسال مجدد کد {seconds} صبر کنید</span>;
  }

  activeButton = () => {
    this.setState({
      disableButton: false,
    });
  };
  diactivateButton = (e) => {
    e.preventDefault();
    this.setState({
      disableButton: true,
    });
    this.props.send_code_again(this.props.phoneNumber);
  };
  submitLogIn = () => {
    let code = document.getElementById("code").value;
    const user = {
      phoneNumber: this.props.phoneNumber,
      code: code,
    };
    this.props.submit_sign_in(user);
  };
  submitSignUp = () => {
    let code = document.getElementById("code").value;
    let email = document.getElementById("email").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;

    const user = {
      phoneNumber: this.props.phoneNumber,
      code,
      email,
      firstName,
      lastName,
    };
    this.props.submit_sign_up(user);
  };
  render() {
    return (
      <div>
        <div className="text-center">
          <Row>
            <Col>
              {this.props.isRegistered ? (
                <Button
                  onClick={this.submitLogIn}
                  className="submit-btn-code-form"
                >
                  تایید
                </Button>
              ) : (
                <Button
                  onClick={this.submitSignUp}
                  className="submit-btn-code-form"
                >
                  تایید
                </Button>
              )}
            </Col>
            <Col>
              <Button
                disabled={this.state.disableButton}
                onClick={this.diactivateButton}
                className="submit-btn-code-form"
              >
                ارسال مجدد
              </Button>
            </Col>
          </Row>
          {this.state.disableButton ? (
            <Countdown
              date={Date.now() + 59000}
              renderer={this.renderer}
              onComplete={this.activeButton}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default connect(null, {
  send_code_again,
  submit_sign_in,
  submit_sign_up,
})(RegisterFormFooter);
