import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () =>{
    return(
        <>
        <footer>
            <div id="footer-section">
                <div className="row">
                    <div className="col-12 col-lg-3">
                        <div className="f-box1">
                            <img src="/images/f-logo.png" alt="" className="img-fluid" />
                            <div className="f-socials d-flex align-item-center gap-4">
                                <Link to="/apply"><FaFacebookF /></Link>
                                <Link to="/apply"><FaInstagram /></Link>
                                <Link to="/apply"><FaLinkedinIn /></Link>
                            </div>
                            <div className="f-app my-3">
                                <div className="app d-flex gap-1 align-item-center">
                                    <Link to="/apply"><FaApple /></Link>
                                    <p>App Store</p>
                                </div>
                            </div>
                            <div className="f-app">
                                <div className="app d-flex gap-1 align-item-center">
                                    <Link to="/apply"><FaGooglePlay /></Link>
                                    <p>Google Play</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        <div className="f-box2">
                            <h3>Family Childcare</h3>
                            <div className="f-text">
                                <p>Nannies</p>
                                <p>Babysitters</p>
                                <p>Special Needs</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                          <div className="f-box2">
                            <h3>Business & Event Childcare</h3>
                            <div className="f-text">
                                <p>Conference & Events</p>
                                <p>Wedding Childcare</p>
                                <p>Hotel & Vacation Babysitters</p>
                                <p>Childcare for Special Events</p>
                                <p>Employee Backup Care</p>
                                <p>Childcare Center Staffing</p>
                                <p>Sports Teams Childcare</p>
                                <p>Gym & Club Childcare</p>
                                <p>Church Childcare</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                         <div className="f-box2">
                            <h3>Additional Information</h3>
                            <div className="f-text">
                                <p>About Us</p>
                                <p>Join Our Team</p>
                                <p>Resources & FAQs</p>
                                <p>Contact Us</p>
                                <p>Find a Location</p>
                                <p>Bright Horizons Back-up Care</p>
                                <p>Franchise Opportunities</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="f-terms">
                <div className="f-term1">
                    <p>Jovie locations are independently owned and operated.</p>
                    <p>© 2026 Jovie All Rights Reserved.</p>
                </div>
                <div className="f-term2">
                    <p>Terms and Conditions</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </footer>
        </>

    )
}
export default Footer;
