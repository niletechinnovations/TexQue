import React from "react";
import "./BlogPage.css";
import { Link } from 'react-router-dom';

class BlogPage extends React.Component {
  
  render() {
    return (
      <>        
        <section className="blog-section">
           <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 mx-auto">
                    <div className="row">
                       <div className="col-lg-4 col-md-4 col-sm-6">
                          <div className="single-blog">
                              <div className="post-tags green-bg">
                                  <a href="#">Design,</a>
                                  <a href="#">Branding</a>
                              </div>
                              <div className="post-img">
                                  <img src="/images/t2.jpg" alt="" />
                              </div>
                              <div className="post-content">
                                  <div className="post-meta">
                                      <a href="#"><i className="ti-user"></i>Admin</a>
                                      <a href="#"><i className="ti-calendar"></i>October 10, 2019</a>
                                  </div>
                                  <h2><Link to="/blog/had-creepeth-them-multiply-lights-brought-had-said">Had creepeth them multiply lights brought had said</Link></h2>
                              </div>
                          </div>
                       </div>
                       <div className="col-lg-4 col-md-4 col-sm-6">
                          <div className="single-blog">
                              <div className="post-tags primary-bg">
                                  <a href="#">Design,</a>
                                  <a href="#">Branding</a>
                              </div>
                              <div className="post-img">
                                  <img src="/images/t2.jpg" alt="" />
                              </div>
                              <div className="post-content">
                                  <div className="post-meta">
                                      <a href="#"><i className="ti-user"></i>Admin</a>
                                      <a href="#"><i className="ti-calendar"></i>October 10, 2019</a>
                                  </div>
                                  <h2><a href="#">Tree can grass to cattle made forth beet doing morning.</a></h2>
                              </div>
                          </div>
                      </div>
                       <div className="col-lg-4 col-md-4 col-sm-6">
                          <div className="single-blog">
                              <div className="post-tags primary-bg">
                                  <a href="#">Design,</a>
                                  <a href="#">Branding</a>
                              </div>
                              <div className="post-img">
                                  <img src="/images/t2.jpg" alt="" />
                              </div>
                              <div className="post-content">
                                  <div className="post-meta">
                                      <a href="#"><i className="ti-user"></i>Admin</a>
                                      <a href="#"><i className="ti-calendar"></i>October 10, 2019</a>
                                  </div>
                                  <h2><a href="#">Dominion in for beast Also said was subdue which seas.</a></h2>
                              </div>
                          </div>
                      </div>
                       <div className="col-lg-4 col-md-4 col-sm-6">
                          <div className="single-blog">
                              <div className="post-tags orange-bg">
                                  <a href="#">Design,</a>
                                  <a href="#">Branding</a>
                              </div>
                              <div className="post-img">
                                  <img src="/images/t2.jpg" alt="" />
                              </div>
                              <div className="post-content">
                                  <div className="post-meta">
                                      <a href="#"><i className="ti-user"></i>Admin</a>
                                      <a href="#"><i className="ti-calendar"></i>October 10, 2019</a>
                                  </div>
                                  <h2><a href="#">Fruit appear light appear two form evening they are right.</a></h2>
                              </div>
                          </div>
                      </div>
                       <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                          <a href="#" className="bttn-mid btn-fill-3">More Post</a>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
        </section>
            
      </>
    );
  }
}

export default BlogPage;
