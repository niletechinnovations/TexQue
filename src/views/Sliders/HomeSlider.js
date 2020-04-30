import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HomeSlider = (props) => {
    
  return (
    
    <OwlCarousel id="home-slider" className="owl-theme" loop nav={false} lazyLoad items="1" dots={false} autoplay={true} >
      
      <div className="item">
        <img src="/images/slider1.jpg" alt="TexQue" />
      </div>
      <div className="item">
        <img src="/images/slider2.jpg" alt="TexQue" />
      </div>
      <div className="item">
        <img src="/images/slider3.jpg" alt="TexQue" />
      </div>
      <div className="item">
        <img src="/images/slider4.jpg" alt="TexQue" />
      </div>
      <div className="item">
        <img src="/images/slider5.jpg" alt="TexQue" />
      </div>
      
    </OwlCarousel>
  
  );
}

export default HomeSlider;