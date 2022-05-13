import classes from "./Product.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { BsCart3 } from "react-icons/bs";
import withRouter from "../withRouter/WithRouter";
import Context from "../context/Context";
import Modal from "./Modal";
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCart: false, showModal: false };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onsubmitForm = this.onsubmitForm.bind(this);
  }
  onsubmitForm(bool) {
    this.setState({ showModal: bool });
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
    if (prevState.showModal !== this.state.showModal) {
      this.context.getModal(this.state.showModal);
    }
  }
  mouseEnter() {
    this.setState({ showCart: true });
  }

  mouseLeave() {
    this.setState({ showCart: false });
  }
  handleClicks(e) {
    if (
      e.target.classList.contains(classes.cartCont) ||
      e.target.classList.contains(classes.cart)
    ) {
      this.setState({ showModal: true });
    }

    if (
      e.target.classList.contains(classes.image) ||
      e.target.getAttribute("id") === "image"
    ) {
      this.props.router.navigate(`/product-page/${this.props.product.id}`);
    }
  }
  render() {
    return (
      <div
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={this.handleClicks}
        className={classes.container}
      >
        <div
          className={`${classes.image} ${
            this.props.product.inStock ? " " : classes.overlay
          }`}
        >
          <img id="image" src={this.props.product.gallery[0]} alt="nice" />
          <div
            className={` ${classes.cartCont} ${
              this.state.showCart ? classes.show : " "
            }`}
          >
            <BsCart3 size="0.8em" className={classes.cart} />
          </div>
        </div>
        <div className={classes.text}>
          <h2 className={classes.title}>{this.props.product.id}</h2>
          {this.props.product.prices.map((price, index) => {
            if (price.currency.symbol === this.context.currency) {
              return (
                <span
                  key={Math.random() * index}
                  className={classes.price}
                >{`${price.currency.symbol} ${price.amount}`}</span>
              );
            }
          })}
        </div>
        {this.state.showModal
          ? ReactDOM.createPortal(
              <Modal
                id={this.props.product.id}
                brand={this.props.product.brand}
                instock={this.props.product.inStock}
                prices={this.props.product.prices}
                images={this.props.product.gallery}
                onsubmitForm={this.onsubmitForm}
              />,
              document.getElementById("modal")
            )
          : ""}
      </div>
    );
  }
}

Product.contextType = Context;
export default withRouter(Product);
