import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { log_out_customer } from "../../actions/customer/customerAuthAction";
import { connect } from "react-redux";

class NavigationSideBar extends Component {
  logOut = async () => {
    await this.props.log_out_customer();
    window.location.reload(true);
  };

  render() {
    return (
      <div>
        <ListGroup className="profile-navigation profile">
          <ListGroup.Item>
            <h4>پروفایل</h4>
          </ListGroup.Item>
          <ListGroup.Item>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <g id="account-icon" transform="translate(-453 -562)">
                    <path
                      id="Icon"
                      d="M0,16V14c0-2.2,3.6-4,8-4s8,1.8,8,4v2ZM4,4A4,4,0,1,1,8,8,4,4,0,0,1,4,4Z"
                      transform="translate(453 562)"
                      fill="#ff6a00"
                    />
                  </g>
                </svg>
              </li>
              <li>حساب کاربری</li>
              <li>
                <ArrowLeft />
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <ul>
              <li>
                <svg
                  id="payment-black-48dp"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="Path_431"
                    data-name="Path 431"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  />
                  <path
                    id="Path_432"
                    data-name="Path 432"
                    d="M20,4H4A1.985,1.985,0,0,0,2.01,6L2,18a1.993,1.993,0,0,0,2,2H20a1.993,1.993,0,0,0,2-2V6A1.993,1.993,0,0,0,20,4Zm0,14H4V12H20ZM20,8H4V6H20Z"
                    fill="#ff6a00"
                  />
                </svg>
              </li>
              <li>افزایش اعتبار</li>
              <li>
                <ArrowLeft />
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="Font_Awesome_5_solid_shopping-basket"
                    d="M24,41.854v.857A1.17,1.17,0,0,1,23,44h-.333l-1.088,9.792A2.243,2.243,0,0,1,19.6,56H4.4a2.243,2.243,0,0,1-1.98-2.208L1.333,44H1a1.17,1.17,0,0,1-1-1.286v-.857a1.17,1.17,0,0,1,1-1.286H3.806L8.255,32.7a1.155,1.155,0,0,1,1.863-.378,2.049,2.049,0,0,1,.294,2.395L7.1,40.569H16.9L13.588,34.72a2.049,2.049,0,0,1,.294-2.395,1.155,1.155,0,0,1,1.863.378l4.449,7.865H23A1.17,1.17,0,0,1,24,41.854ZM13,51.283v-6A1.17,1.17,0,0,0,12,44a1.17,1.17,0,0,0-1,1.286v6a1.17,1.17,0,0,0,1,1.286A1.17,1.17,0,0,0,13,51.283Zm4.667,0v-6a1.17,1.17,0,0,0-1-1.286,1.17,1.17,0,0,0-1,1.286v6a1.17,1.17,0,0,0,1,1.286A1.17,1.17,0,0,0,17.667,51.283Zm-9.333,0v-6a1.17,1.17,0,0,0-1-1.286,1.17,1.17,0,0,0-1,1.286v6a1.17,1.17,0,0,0,1,1.286A1.17,1.17,0,0,0,8.333,51.283Z"
                    transform="translate(0 -31.997)"
                    fill="#ff6a00"
                  />
                </svg>
              </li>
              <li>لیست سفارشات</li>
              <li>
                <ArrowLeft />
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <ul className="profile" onClick={this.logOut}>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="12"
                  viewBox="0 0 37.054 24"
                >
                  <g id="logout" transform="translate(-160.034 -240.868)">
                    <g
                      id="Group_100"
                      data-name="Group 100"
                      transform="translate(160.034 240.868)"
                    >
                      <g id="Group_99" data-name="Group 99">
                        <path
                          id="Path_433"
                          data-name="Path 433"
                          d="M22.154,22.85H5.538c-1.019,0-1.846-.448-1.846-1v-18c0-.552.827-1,1.846-1H22.154C23.175,2.85,24,2.4,24,1.85s-.825-1-1.846-1H5.538C2.485.85,0,2.2,0,3.85v18c0,1.654,2.485,3,5.538,3H22.154c1.021,0,1.846-.447,1.846-1S23.175,22.85,22.154,22.85Z"
                          transform="translate(0 -0.85)"
                          fill="#ff6a00"
                        />
                      </g>
                    </g>
                    <g
                      id="Group_102"
                      data-name="Group 102"
                      transform="translate(177.598 245.5)"
                    >
                      <g id="Group_101" data-name="Group 101">
                        <path
                          id="Path_434"
                          data-name="Path 434"
                          d="M189.229,114.034l-7.369-6.555a1.308,1.308,0,0,0-1.714.011,1.017,1.017,0,0,0,.012,1.545l5.266,4.685H171.312a1.1,1.1,0,1,0,0,2.185h14.112l-5.266,4.685a1.018,1.018,0,0,0-.012,1.545,1.307,1.307,0,0,0,1.714.011l7.369-6.555a1.018,1.018,0,0,0,0-1.556Z"
                          transform="translate(-170.1 -107.165)"
                          fill="#ff6a00"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </li>
              <li>خروج</li>
              <li>
                <ArrowLeft />
              </li>
            </ul>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}
export default connect(null, {
  log_out_customer,
})(NavigationSideBar);
