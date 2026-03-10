import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen((prev) => !prev);
    };

    const closeNav = () => {
        setIsOpen(false);
    };

    return(
        <>
            <header>
                <div className={`burger ${isOpen ? 'close' : ''}`} onClick={toggleNav}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
                <div className="logo">
                    <Link to="/" onClick={closeNav}>
                        <picture>
                            <source media="(max-width: 768px)" srcSet="/images/header-logo-1.webp" />
                            <img src="/images/jovie-logo3.png" alt="Jovie logo" className='img-fluid' />
                        </picture>
                    </Link>
                </div>
                <div className={`nav-bar ${isOpen ? 'active' : ''}`}>
                    <nav>
                        <Link to="/apply" onClick={closeNav}>Find a Nanny / Sitter</Link>
                        <Link to="/apply" onClick={closeNav}>Find a Job</Link>
                        <Link to="/apply" onClick={closeNav}>Apply Now</Link>
                    </nav>
                    <div className="dropdown-nav mt-4">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Family Childcare
                            </button>

                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Nannies</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Babysitters</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Special Needs Childcare</Link></li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Business & Events Childcare
                            </button>

                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Conference & Events</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Wedding Childcare</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Hotel & Vacation Babysitting</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Childcare for Special Events</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Employee Backup care</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Childcare Center Staffing</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Sports Teams Childcare</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Gym & Club Childcare</Link></li>
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Church Childcare</Link></li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                About Us
                            </button>

                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/apply" onClick={closeNav}>Resources & FAQ</Link></li>
                            </ul>
                        </div>
                        <Link to="/apply" className='blog-text' onClick={closeNav}>Blog</Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
