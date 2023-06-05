import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import apiFetch from '@wordpress/api-fetch';

import Menu from "./components/Menu";
import Fields from "./pages/Fields";
import Appearance from "./pages/Appearance";

const Settings = () => {
    const [ fieldsData, setFieldsData ] = useState({});

    useEffect( () => {
        apiFetch( {
            path: '/react-wp-starter/v1/settings'
        } )
        .then( resp => {
            setFieldsData( resp );
        } )
        .catch( err => {
            console.log( err );
        } )
    }, [] );

    return ( 
        <div className="react-app-settings">
            <h1>Settings</h1>
            
            <div className="react-app-settings-wrap">
                <Router>
                    <Menu />
                    
                    <div className="react-menu-content">
                        <Routes>
                            <Route path="/" element={ <Fields fieldsData={ fieldsData } /> }/>
                            <Route path="/appearance" element={ <Appearance /> }/>
                        </Routes>
                    </div>
                </Router>
            </div>
        </div>
    );
}
 
export default Settings;