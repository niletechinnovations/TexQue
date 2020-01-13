import React, { Component } from 'react';
import  { Link } from 'react-router-dom';

import "./MyList.css";
import {
 // Row, Col, Table,
  Card, CardHeader, CardBody
} from 'reactstrap';


class FoodTruckLists extends Component {
  constructor(props) {
    super( props );

    this.state = {
      data: '',
    };
  }

  render() {

    return (
      <div className="user-dashboard">
        <div className="list-card bg-white rounded shadow-sm mb-4 ">
          <div className="list-card-media">
            <Link to="/user/listing-details">
                <img src="/images/fb-restaurant-15.png" alt="" />                                
            </Link>
          </div>
          <div className="list-card-content">
            <h2>Taco Bell</h2>
            <span className="location">United States, Florida, Miami</span>

            <div className="rating-star">
                <span className="rating-box" style={{width:"75%"}}></span>
            </div>
            <p><b>Type of food :</b> Apple Juice, BB.Q, Carrot Juice, Chines Soup, Cold Coffee, Cold Drink, Pastry, Sham pane, Soda water, Tea</p>
          
            <div className="btn-view-card"><Link to="/user/listing-details">View More</Link></div>
          </div>
        </div>

        <div className="list-card bg-white rounded shadow-sm mb-4 ">
          <div className="list-card-media">
            <Link to="/user/listing-details">
                <img src="/images/fb-restaurant-15.png" alt="" />                                
            </Link>
          </div>
          <div className="list-card-content">
            <h2>Taco Bell</h2>
            <span className="location">United States, Florida, Miami</span>

            <div className="rating-star">
                <span className="rating-box" style={{width:"75%"}}></span>
            </div>
            <p><b>Type of food :</b> Apple Juice, BB.Q, Carrot Juice, Chines Soup, Cold Coffee, Cold Drink, Pastry, Sham pane, Soda water, Tea</p>
          
            <div className="btn-view-card"><Link to="/user/listing-details">View More</Link></div>
          </div>
        </div>

        <div className="list-card bg-white rounded shadow-sm mb-4 ">
          <div className="list-card-media">
            <a href="#">
                <img src="/images/fb-restaurant-15.png" alt="" />                                
            </a>
          </div>
          <div className="list-card-content">
            <h2>Taco Bell</h2>
            <span className="location">United States, Florida, Miami</span>

            <div className="rating-star">
                <span className="rating-box" style={{width:"75%"}}></span>
            </div>
            <p><b>Type of food :</b> Apple Juice, BB.Q, Carrot Juice, Chines Soup, Cold Coffee, Cold Drink, Pastry, Sham pane, Soda water, Tea</p>
          
            <div className="btn-view-card"><a href="#">View More</a></div>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodTruckLists;
