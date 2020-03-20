import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HomeSlider = (props) => {
  
  const myLists = props.data;
  const listItems = myLists.map((value, index) =>  
    <div  key={index} className="home-category-item">
      <a href="#!">
        <img src={ ( value.featuredImage!=='' ? value.featuredImage : "/images/dummy-food-truck.png" ) } alt={value.truckName}/>
        <h6>{value.truckName}</h6>
      </a>
    </div>
  );  
  
  if(listItems.length===0)
    return (<></>);
    
    return (
      <>
      <OwlCarousel  className="owl-theme" loop nav={false} lazyLoad  responsive={ {0:{items:2},200:{items:3},1000:{items:6},12000:{items:6}}}>
        {listItems}
      </OwlCarousel>
      </>
    );
}

export default HomeSlider;