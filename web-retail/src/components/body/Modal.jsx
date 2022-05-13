import classes from "./Modal.module.css";
import React from "react";
import Context from "../context/Context";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

const getData = gql`
  query GetData($id: String!) {
    product(id: $id) {
      attributes {
        id
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;
class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleForm = this.handleForm.bind(this);
  }

  handleForm(event) {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    const data = {
      brand: this.props.brand,
      id: this.props.id,
      prices: this.props.prices,
      gallery: this.props.images,
      attributes: [],
    };
    for (let [key, value] of formData.entries()) {
      data.attributes.push({ [key]: value });
    }
    if (this.context.cartObject) {
      let numCheck = 0;
      for (let obj of this.context.cartObject) {
        for (let i = 0; i < obj.attributes.length; i++) {
          const values1 = Object.values(obj.attributes[i]);
          if (i === data.attributes.length) {
            break;
          }
          const values2 = Object.values(data.attributes[i]);
          if (values1[0] === values2[0]) {
            numCheck++;
          }
        }
        if (numCheck === obj.attributes.length) {
          numCheck = 0;
          return alert("Item With Similar Specs Already In Cart");
        }
        numCheck = 0;
      }
    }

    this.context.getCartObject(data);
    this.props.onsubmitForm(false);
  }

  render() {
    if (!this.props.instock) {
      return (
        <div
          id="modal"
          className={`${classes.modalContainer} ${
            this.context.showModal ? classes.show : " "
          }`}
        >
          <h2 className={classes.alert}>Item Is Out Of Stock</h2>
        </div>
      );
    }
    return (
      <div
        id="modal"
        className={`${classes.modalContainer} ${
          this.context.showModal ? classes.show : " "
        }`}
      >
        <div className={classes.titles}>
          <h3>{this.props.brand}</h3>
          <h2>{this.props.id}</h2>
          {this.props.prices.map((price, index) => {
            if (price.currency.symbol === this.context.currency) {
              return (
                <h2 key={Math.random() * index}>
                  Price: {`${price.currency.symbol} ${price.amount.toFixed(2)}`}
                </h2>
              );
            }
            return;
          })}
        </div>
        <form onSubmit={this.handleForm}>
          <Query
            pollInterval={500}
            query={getData}
            variables={{ id: this.props.id }}
          >
            {({ loading, error, data }) => {
              if (loading) return <h1>Loading...</h1>;
              if (error) return <h1>Error...</h1>;
              if (data) {
                return data.product.attributes.map((attribute, index) => {
                  return (
                    <label key={Math.random() * index} htmlFor={attribute.id}>
                      {attribute.id}
                      <select id={attribute.id} name={attribute.id}>
                        {attribute.items.map((item, index) => {
                          return (
                            <React.Fragment key={Math.random() * index}>
                              {attribute.id === "Color" ? (
                                <option
                                  key={Math.random() * index}
                                  value={item.value}
                                  style={{ backgroundColor: item.value }}
                                >
                                  {item.displayValue}
                                </option>
                              ) : (
                                <option
                                  key={Math.random() * index}
                                  value={item.displayValue}
                                >
                                  {item.displayValue}
                                </option>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </select>
                    </label>
                  );
                });
              }
            }}
          </Query>
          <button type="submit">ADD TO CART</button>
        </form>
      </div>
    );
  }
}
Modal.contextType = Context;
export default Modal;
