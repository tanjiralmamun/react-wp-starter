import React, { useEffect, useState } from "react";
import apiFetch from '@wordpress/api-fetch';

const Fields = ( { settings } ) => {
    const [ country, setCountry ] = useState( '' );

    useEffect( () => {
        // apiFetch( {
        //     path: '/react-wp-starter/v1/settings'
        // } )
        // .then( resp => {
        //     setCountry( resp.country )
        // } )
        console.log( settings );
    }, [] )

    console.log( settings );
    // setCountry( settings.country );

    const handleSubmit = e => {
        e.preventDefault();
        
        let data = { 
            country: country 
        }

        apiFetch( {
            path: '/react-wp-starter/v1/settings',
            method: 'POST',
            data: data
        } )
        .then( resp => {
            console.log( resp )
            setCountry( resp.country )
        } )
        .catch( err => {
            console.log( err );
        } )
    }

    return ( 
        <div className="react-wp-fields">
            <form onSubmit={ handleSubmit }>
                <div className="field-content">
                    <fieldset>
                        <div className="field-data">
                            <h3 className="field-heading">Country</h3>
                        </div>

                        <div className="field">
                            <input 
                                type="text" 
                                id="country"
                                className="regular-text"
                                value={ country }
                                name="country"
                                onChange={ e => setCountry( e.target.value ) }
                            />
                        </div>
                    </fieldset>
                </div>

                <input type="submit" className="button button-primary" value="Save Changes" />
            </form>
        </div>
    );
}
 
export default Fields;