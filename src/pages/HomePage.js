import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';
import Products from './Products'; 

const Homepage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="homepage">
            <header className="header">
                <div className="logo">
                    <img src="/images/Amazon_Hub_Logo.jpg" alt="Amazon Hub logo" className="logo-image" />
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search products..." />
                    <button>Search</button>
                    <button>Previous</button>
                </div>
            </header>

            <Slider {...settings}>
                <div><img src="/images/airpods.jpg" alt="airpods" className="slider-image" /></div>
                <div><img src="/images/keyboard.jpg" alt="keyboard" className="slider-image" /></div>
                <div><img src="/images/pc.jpg" alt="pc" className="slider-image" /></div>
                <div><img src="/images/phones.jpg" alt="phones" className="slider-image" /></div>
            </Slider>

            <main>
                <section>
                    <h2>Product Categories</h2>
                    <div>Products</div>
                </section>

                <section>
                    <h2> Products</h2>
                    {/* Render Products component here */}
                    < Products />
                </section>

                <section>
                    <h2>User Reviews</h2>
                    <div>Reviews Here</div>
                </section>
            </main>

            <footer className="footer">
                <p>Contact us at: info@amazingbargain.com</p>
                <p>Follow us on social media!</p>
            </footer>
        </div>
    );
};

export default Homepage;

