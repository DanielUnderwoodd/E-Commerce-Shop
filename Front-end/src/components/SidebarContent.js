import React, { useState } from "react";
import "../componentsCss/SliderContent.css";
import { connect } from "react-redux";
import Sidebar1 from "./Sidebar1";
import Sidebar2 from "./Sidebar2";
import Sidebar3 from "./Sidebar3";
import { check_out } from "../actions/customer/customerAuthAction";

function SidebarContent({
  toggleSidebar,
  cart,
  setLoginModal,
  isLogIn,
  check_out,
  userEmail,
}) {
  debugger;
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [payment, setPayment] = useState("");

  const submitCheckOut = () => {
    debugger;
    let data = {}
    data.products = "";
    data.productsCount = cart.length;

    for(let i =0; i < cart.length; i++){
      data.products += cart[i].text;
      data.products += " ,count: " + cart[i].quantity;
    }

    data.address = selectedAddress[0].location;
    data.is_payed = payment != "unpay";

    data.totalPrice = 0;
    for(let i=0;i<cart.length;i++){
      data.totalPrice += (Number(cart[i].price) * cart[i].quantity);
    }
    data.userEmail = userEmail;

    check_out(data);
  };

  const nextStep = () => {
    setStep((currentState) => currentState + 1);
  };

  const prevStep = () => {
    setStep((currentState) => currentState - 1);
  };

  return (
    <>
      {step === 1 && (
        <Sidebar1
          toggleSidebar={toggleSidebar}
          data={cart}
          setLoginModal={setLoginModal}
          isLogIn={isLogIn}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 2 && (
        <Sidebar2
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Sidebar3
          prevStep={prevStep}
          payment={payment}
          setPayment={setPayment}
          setSelectedAddress={setSelectedAddress}
          submitCheckOut={submitCheckOut}
        />
      )}
    </>
  );
}

const mapPropsToState = (state) => {
  debugger;
  const { auth, _public } = state;
  return {
    isLogIn: auth.isLogIn,
    cart: _public.cart,
    userEmail: state.customer.email
  };
};

export default connect(mapPropsToState, {
  check_out,
})(SidebarContent);