import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { ReactComponent as Arrow } from "../img/back_arrow.svg";
import { connect } from "react-redux";
import shortid from "shortid";

function Sidebar2({ prevStep, addresses }) {
  return (
    <>
      <Row className="sidebar2-row">
        <Col xs={2} className="back-btn">
          <Arrow onClick={() => prevStep()} />
        </Col>
      </Row>
      <hr />

      <div style={{ height: "inherit", marginBottom: "24px" }}>
        <div className="mb-3">
          <Form>
            {addresses.map((address) => {
              return (
                <>
                  <Form.Check
                    reverse
                    name="group1"
                    type="radio"
                    label={address.location}
                    id={address._id}
                    key={shortid.generate()}
                  />
                  <hr />
                </>
              );
            })}
          </Form>
        </div>
      </div>
    </>
  );
}

const mapPropsToState = (state) => {
  const { customer } = state;
  return {
    addresses: customer.address,
  };
};

export default connect(mapPropsToState, {})(Sidebar2);
