import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Category Images
import FreezerImg from '../imgs/freezer.png';
import FridgeImg from '../imgs/fridge.png';
import PantryImg from '../imgs/pantry.png';
import CounterImg from '../imgs/countertop.png';

const styles = {
   column : {
      minHeight: '350px',
      maxHeight: '500px',
      minWidth: '350px',
      maxWidth: '500px',
  },
  pushDown: {
    opacity: "0.0",
    height: "0px"
  }
}

const page = "Kitchen";

let KitchenLink = ({to, imgSrc, altText}) => (
  <div style={styles.column} className="col-4 p-2">
    <div className="card">
      <Link to={to}>
        <img className="card-img-top" src={imgSrc} alt={altText} />
      </Link>
    </div>
  </div>
);

class Kitchen extends Component {
   render() {
      return(
        <div>
          <div style={styles.pushDown} className="jumbotron"></div>
            <div className="container m-0 p-0">
              <div className="row m-0 p-1 justify-content-center">
                <KitchenLink to="/Fridge" imgSrc={FridgeImg} altText="Fridge" />
                <KitchenLink to="/Freezer" imgSrc={FreezerImg} altText="Freezer" />
                <KitchenLink to="/Pantry" imgSrc={PantryImg} altText="Pantry" />
                <KitchenLink to="/Counter" imgSrc={CounterImg} altText="Counter" />
              </div>
            </div>
         </div>
      );
   }
}

export default Kitchen;
