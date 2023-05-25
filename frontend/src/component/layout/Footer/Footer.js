import React from 'react';
import appStore from '../../../images/appStore.png';
import playStore from '../../../images/playStore.png';
import './Footer.css';


const Footer = () => {
    return (
        <footer id="footer">
            
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="appStore" />
            </div>
            
            <div className="midFooter">
                <h1>ECOMMERCE.</h1>
                <p>High Quality is our first priority</p>

                <p>Copyright 2021  &copy; MasterDhanesh</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="/">Instagram</a>
                <a href="/">Youtube</a>
                <a href="/">Facebook</a>
            </div>

        </footer>
    )
}

export default Footer
