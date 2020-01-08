import React  from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OfferSlider = (props) => {
  
  return (
    <OwlCarousel className="owl-theme" loop nav items="1" dots="0">
      <div className="item">
        <a href="/">
          <img src="/images/slider.png" className="img-fluid rounded" alt="Slider 1"/>
        </a>
      </div>
      <div className="item">
        <a href="/">
          <img src="/images/slider1.png" className="img-fluid rounded" alt="Slider 2"/>
        </a>
      </div>
      <div className="item">
        <a href="/">
          <img src="/images/slider.png" className="img-fluid rounded" alt="Slider 3"/>
        </a>
      </div>
    </OwlCarousel>
  );
}

export default OfferSlider;