import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const HomeSlider = (props) => {
  
  return (
    <OwlCarousel  className="owl-theme" loop nav lazyLoad  responsive={ {0:{items:3},200:{items:3},1000:{items:6},12000:{items:6}}}>
      <div className="home-category-item">
        <a href="/">
          <img src="/images/1.png" alt="Chinese food van"/>
          <h6>Chinese food van</h6>
        </a>
      </div>
      <div className="home-category-item">
        <a href="/">
          <img src="/images/2.png" alt="FOOD FACTORY"/>
          <h6>FOOD FACTORY</h6>
        </a>
      </div>
      <div className="home-category-item">
        <a href="/">
          <img src="/images/3.png" alt="DupChuk Food Truck"/>
          <h6>DupChuk Food Truck</h6>
        </a>
      </div>
      <div className="home-category-item">
        <a href="/">
          <img src="/images/4.png" alt="Freshplate Food Truck"/>
          <h6>Freshplate Food Truck</h6>
        </a>
      </div>
      <div className="home-category-item">
        <a href="/">
          <img src="/images/5.png" alt="Silver Spoon Food Trucks"/>
          <h6>Silver Spoon Food Trucks</h6>
        </a>
      </div>
    </OwlCarousel>
  );
}

export default HomeSlider;