import React from "react";
import classes from "./PageMiddle.module.css";

class PageMiddle extends React.Component {
  constructor(props) {}
  render() {
    return (
      <div className={classes.middle}>
        {
          <img
            src={`${
              this.props.largeImg === " "
                ? this.props.indexImg
                : this.props.largeImg
            }`}
            alt="nature"
          />
        }
      </div>
    );
  }
}

export default PageMiddle;
