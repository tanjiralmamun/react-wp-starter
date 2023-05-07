import React, { useEffect, useState } from "react";
import apiFetch from '@wordpress/api-fetch';

const Fields = () => {
    const [ inputs, setInputs ] = useState({});

    const handleChange = event => {
        const name  = event.target.name;
        const value = event.target.value;

        setInputs( values => ( {
                    ...values, 
                    [name]: value
                } 
            ) 
        );
    }

    useEffect( () => {
        apiFetch( {
            path: '/react-wp-starter/v1/settings'
        } )
        .then( resp => {
            console.log( 'GET Response: ' + resp )
            // setCountry( resp.country )
        } )
    }, [] )

    const handleSubmit = e => {
        e.preventDefault();
        console.log(inputs)
        let data = { 
            inputs: inputs 
        }

        apiFetch( {
            path: '/react-wp-starter/v1/settings',
            method: 'POST',
            data: data
        } )
        .then( resp => {
            console.log( 'POST Response: ' + resp )
            // setCountry( resp.country )
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
                            <h3 className="field-heading">Street</h3>
                        </div>

                        <div className="field">
                            <input 
                                type="text" 
                                id="street"
                                className="regular-text"
                                value={ inputs.street || "" }
                                name="street"
                                onChange={ handleChange }
                            />
                        </div>
                    </fieldset>
                </div>

                <div className="field-content">
                    <fieldset>
                        <div className="field-data">
                            <h3 className="field-heading">State</h3>
                        </div>

                        <div className="field">
                            <input 
                                type="text" 
                                id="state"
                                className="regular-text"
                                value={ inputs.state || "" }
                                name="state"
                                onChange={ handleChange }
                            />
                        </div>
                    </fieldset>
                </div>

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
                                value={ inputs.country || ""  }
                                name="country"
                                onChange={ handleChange }
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