import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return ( 
        <nav className="react-settings-nav">
            <div className="nav-section">
                <div className="nav-tab">
                    <div className="nav-title">
                        <Link to="/">Fields</Link>
                    </div>
                </div>
                <div className="nav-tab">
                    <div className="nav-title">
                        <Link to="/appearance">Appearance</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
 
export default Menu;