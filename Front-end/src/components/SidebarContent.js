import React, { useState } from "react";
import "../componentsCss/SliderContent.css";
import { connect } from "react-redux";
import Sidebar1 from "./Sidebar1";
import Sidebar2 from "./Sidebar2";

function SidebarContent({ toggleSidebar, data, setLoginModal, isLogIn }) {
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [payment, setPayment] = useState("");

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
          data={data}
          setLoginModal={setLoginModal}
          isLogIn={isLogIn}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 2 && <Sidebar2 nextStep={nextStep} prevStep={prevStep} />}
    </>
  );
}

const mapPropsToState = (state) => {
  const { auth } = state;
  return {
    isLogIn: auth.isLogIn,
  };
};

export default connect(mapPropsToState, {})(SidebarContent);
