import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const ProductSlider = (props) => {
  
  return (
    <OwlCarousel id="products-carousel" className="owl-theme" loop lazyLoad responsive={ {0:{items:3},200:{items:3},1000:{items:3},12000:{items:3}}}>
      <div className="item">
        <div className="products-item-card">
            <div className="products-item-image">
              <a href="/">
              <img src="images/t1.jpg" className="img-fluid item-img" alt="" />
              </a>
            </div>
            <div className="products-item-content">
              <h2><a href="/">DupChuk Food Truck</a></h2>
              <div className="products-rate">
                  <i className="fa fa-star-o"></i> 5
              </div>
              <div className="location">311 W. Broadway, Eden, TX 76837, United States</div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </div>
        </div>
      </div>
      <div className="item">
        <div className="products-item-card">
            <div className="products-item-image">
              <a href="/">
              <img src="images/t2.jpg" className="img-fluid item-img" alt="Freshplate Food Truck" />
              </a>
            </div>
            <div className="products-item-content">
              <h2><a href="/">Freshplate Food Truck</a></h2>
              <div className="products-rate">
                  <i className="fa fa-star-o"></i> 2
              </div>
              <div className="location">311 W. Broadway, Eden, TX 76837, United States</div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </div>
        </div>
      </div>
      <div className="item">
        <div className="products-item-card">
            <div className="products-item-image">
              <a href="/">
              <img src="images/t3.jpg" className="img-fluid item-img" alt="" />
              </a>
            </div>
            <div className="products-item-content">
              <h2><a href="/">Silver Spoon Food Trucks</a></h2>
              <div className="products-rate">
                  <i className="fa fa-star-o"></i> 0
              </div>
              <div className="location">311 W. Broadway, Eden, TX 76837, United States</div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </div>
        </div>
      </div>
      <div className="item">
        <div className="products-item-card">
            <div className="products-item-image">
              <a href="/">
              <img src="images/t4.jpg" className="img-fluid item-img" alt="" />
              </a>
            </div>
            <div className="products-item-content">
              <h2><a href="/">KEBABZ NIRVANA</a></h2>
              <div className="products-rate">
                  <i className="fa fa-star-o"></i> 0
              </div>
              <div className="location">311 W. Broadway, Eden, TX 76837, United States</div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </div>
        </div>
      </div>
      <div className="item">
        <div className="products-item-card">
            <div className="products-item-image">
              <a href="/">
              <img src="images/t5.jpg" className="img-fluid item-img" alt="" />
              </a>
            </div>
            <div className="products-item-content">
              <h2><a href="/">The LaliT Food Truck</a></h2>
              <div className="products-rate">
                  <i className="fa fa-star-o"></i> 0
              </div>
              <div className="location">311 W. Broadway, Eden, TX 76837, United States</div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </div>
        </div>
      </div>
    </OwlCarousel>
  );
}

export default ProductSlider;