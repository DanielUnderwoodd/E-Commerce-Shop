import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import VerificationCode from "./VerificationCode";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "../../componentsCss/VerificationCode.css";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 0,
      phoneNumber: null,
      isRegistered: null,
    };
  }
  changeCurrentStep = (selectedStep) => {
    if (selectedStep === 1) {
      this.setState((preState) => {
        return {
          ...preState,
          currentStep: preState.currentStep + 1,
        };
      });
    } else {
      this.setState((preState) => {
        return {
          ...preState,
          currentStep: preState.currentStep - 1,
        };
      });
    }
  };
  setPhoneNumber = (phoneNumber) => {
    this.setState((preState) => {
      return {
        ...preState,
        phoneNumber,
      };
    });
  };
  setIsRegistered = (isRegistered) => {
    this.setState((preState) => {
      return {
        ...preState,
        isRegistered,
      };
    });
  };
  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <VerificationCode
            changeCurrentStep={this.changeCurrentStep}
            currentStep={this.state.currentStep}
            setPhoneNumber={this.setPhoneNumber}
            setIsRegistered={this.setIsRegistered}
          />
          {this.state.isRegistered ? (
            <SignIn
              changeCurrentStep={this.changeCurrentStep}
              currentStep={this.state.currentStep}
              phoneNumber={this.state.phoneNumber}
              isRegistered={this.state.isRegistered}
            />
          ) : (
            <SignUp
              changeCurrentStep={this.changeCurrentStep}
              currentStep={this.state.currentStep}
              phoneNumber={this.state.phoneNumber}
              isRegistered={this.state.isRegistered}
            />
          )}
        </Modal>
      </div>
    );
  }
}
const mapPropsToState = (state) => {
  const { auth } = state;
  return {
    isRegistered: auth.isRegistered,
  };
};

export default connect(mapPropsToState, {})(RegisterForm);
