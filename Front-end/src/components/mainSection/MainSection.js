import React, { Component } from "react";
import { Container } from "react-bootstrap";

import { connect } from "react-redux";
import { get_product } from "../../actions/public/publicAction";
import CarouselCustom from "../../config/CarouselCustom";
import ECommerceCard from "../ECommerceCard";
import shortid from "shortid";
import "../../componentsCss/Slider.css";

class MainSection extends Component {
  constructor() {
    super();
    this.state = {
      sidebarOpen: true,
    };
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  };

  componentDidMount() {
    this.props.get_product();
  }

  render() {
    return (
      <div className="slider">
        <Container>
          {this.props.products.map((category) => {
            return (
              <React.Fragment key={shortid.generate()}>
                <div style={{ display: "flex" }}>
                  <h3>{category.categoryName}</h3>
                  <button className="btn">see all</button>
                </div>
                <CarouselCustom>
                  {category.products.map((product) => {
                    let { id, image, title, price } = product;
                    return (
                      <ECommerceCard
                        id={id}
                        img={image}
                        text={title}
                        price={price}
                        key={shortid.generate()}
                      />
                    );
                  })}
                </CarouselCustom>
              </React.Fragment>
            );
          })}
        </Container>
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  const { _public } = state;

  return {
    products: _public.Products,
  };
};

export default connect(mapPropsToState, {
  get_product,
})(MainSection);
