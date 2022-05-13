import React from "react";
import classes from "./Products.module.css";
import Product from "./Product";
import withRouter from "../withRouter/WithRouter";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
const Data = gql`
  query GetData($id: String!) {
    category(input: { title: $id }) {
      products {
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }

        id

        gallery
        brand

        description
        inStock
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;
class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className={classes.header}>
          <h2>Category Name</h2>
        </div>
        <div className={classes.items}>
          <Query query={Data} variables={{ id: this.props.router.params.id }}>
            {({ loading, error, data }) => {
              if (loading) return <h1>Loading...</h1>;
              if (error) return <h1>Error...</h1>;

              return data.category.products.map((product, index) => {
                return <Product key={product.id} product={product} />;
              });
            }}
          </Query>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Products);
