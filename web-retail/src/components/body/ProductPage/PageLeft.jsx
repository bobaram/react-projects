import React from "react";
import classes from "./PageLeft.module.css";

class PageLeft extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.props.getImage} className={classes.left}>
        {this.props.images.map((product, index, arr) => {
          if (index < 5)
            return (
              <div key={Math.random() * index} className={classes.imgCont}>
                <img id="image" src={product} />
              </div>
            );
        })}
      </div>
    );
  }
}

export default PageLeft;
