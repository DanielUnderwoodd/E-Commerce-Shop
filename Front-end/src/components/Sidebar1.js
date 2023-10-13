import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { ReactComponent as Arrow } from "../img/back_arrow.svg";
import { ReactComponent as Delete } from "../img/delete.svg";
import SidebarButton from "./SidebarButton";

import shortid from "shortid";

export default function Sidebar1({
  toggleSidebar,
  data,
  setLoginModal,
  isLogIn,
  nextStep,
}) {
  return (
    <>
      <Row>
        <Col xs={2}>
          <Arrow onClick={toggleSidebar} />{" "}
        </Col>
        <Col xs={8}>My cart ({data.length})</Col>
        <Col xs={2}>
          <Delete />
        </Col>
      </Row>
      <hr />
      <div style={{ height: "inherit", marginBottom: "24px" }}>
        {data.map((product, index) => {
          return (
            <div key={shortid.generate()}>
              {index === data.length - 1 ? (
                <div className="adjust-last-element">
                  <SidebarButton product={product} key={shortid.generate()} />
                </div>
              ) : (
                <>
                  <SidebarButton product={product} key={shortid.generate()} />{" "}
                  <hr />{" "}
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="slider-button">
        <span>price</span>
        {isLogIn ? (
          <Button onClick={() => nextStep()}>Next </Button>
        ) : (
          <Button onClick={setLoginModal}>Login/Register </Button>
        )}
      </div>
    </>
  );
}
