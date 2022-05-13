import React from "react";
import ReactDOM from "react-dom";
import classes from "./PageRight.module.css";
import { Interweave } from "interweave";
import Context from "../../context/Context";
import Modal from "../Modal";
class PageRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleClicks = this.handleClicks.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onsubmitForm = this.onsubmitForm.bind(this);
  }
  onsubmitForm(bool) {
    this.setState({ showModal: bool });
  }
  handleClicks(e) {
    this.setState({ showModal: true });
  }
  closeModal(e) {
    if (e.target.getAttribute("id") === "overlay" && this.state.showModal) {
      this.setState({ showModal: false });
    }
  }
  componentDidMount() {
    window.addEventListener("click", this.closeModal);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showModal != this.state.showModal) {
      this.context.getModal(this.state.showModal);
    }
  }
  render() {
    return (
      <div className={classes.right}>
        <div className={classes.title}>
          <h3>{this.props.brand}</h3>
          <h2>{this.props.id}</h2>
        </div>
        {this.props.attributes.length === 0 ? (
          <div className={classes.size}>
            <h2>No Attributes Available!</h2>
          </div>
        ) : (
          this.props.attributes.map((product, index) => {
            if (product.id === "Size") {
              return (
                <div key={Math.random() * index} className={classes.size}>
                  <h4>SIZE :</h4>
                  <div className={classes.sizes}>
                    {product.items.map((item, index) => {
                      return (
                        <div
                          key={Math.random() * index}
                          className={classes.sizeBox}
                        >
                          <span>{item.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (product.id === "Capacity") {
              return (
                <div key={Math.random() * index} className={classes.size}>
                  <h4>Capacity :</h4>
                  <div className={classes.sizes}>
                    {product.items.map((item, index) => {
                      return (
                        <div
                          key={Math.random() * index}
                          className={classes.sizeBox}
                        >
                          <span>{item.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })
        )}

        <div className={classes.price}>
          <h4>PRICE :</h4>
          {this.props.prices.map((price, index) => {
            if (price.currency.symbol === this.context.currency)
              return (
                <span key={Math.random() * index} className={classes.price}>{`${
                  price.currency.symbol
                } ${price.amount.toFixed(2)}`}</span>
              );
          })}
        </div>
        <button onClick={this.handleClicks} className={classes.button}>
          ADD TO CART
        </button>
        <div className={classes.description}>
          <Interweave content={this.props.description} />
        </div>
        {this.state.showModal
          ? ReactDOM.createPortal(
              <Modal
                id={this.props.id}
                brand={this.props.brand}
                prices={this.props.prices}
                instock={this.props.instock}
                images={this.props.gallery}
                onsubmitForm={this.onsubmitForm}
              />,
              document.getElementById("modal")
            )
          : " "}
      </div>
    );
  }
}
PageRight.contextType = Context;
export default PageRight;
