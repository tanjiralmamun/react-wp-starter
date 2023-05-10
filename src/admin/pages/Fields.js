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
            setInputs( resp )
        } )
        .catch( err => {
            console.log( err );
        } )
    }, [] )

    const handleSubmit = e => {
        e.preventDefault();
        
        let data = { inputs };

        apiFetch( {
            path: '/react-wp-starter/v1/settings',
            method: 'POST',
            data: data
        } )
        .then( resp => {
            setInputs( resp )
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
                                id="rws_street"
                                className="regular-text"
                                value={ inputs.rws_street || "" }
                                name="rws_street"
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
                                id="rws_state"
                                className="regular-text"
                                value={ inputs.rws_state || "" }
                                name="rws_state"
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
                                id="rws_country"
                                className="regular-text"
                                value={ inputs.rws_country || ""  }
                                name="rws_country"
                                onChange={ handleChange }
                            />
                        </div>
                    </fieldset>
                </div>

                <div className="field-content">
                    <fieldset>
                        <div className="field-data">
                            <h3 className="field-heading">About</h3>
                        </div>

                        <div className="field">
                            <textarea
                                id="rws_about"
                                className="regular-text"
                                rows="3"
                                value={ inputs.rws_about || "" }
                                name="rws_about"
                                onChange={ handleChange }
                            />
                        </div>
                    </fieldset>
                </div>

                <div className="field-content">
                    <fieldset>
                        <div className="field-data">
                            <h3 className="field-heading">Designation</h3>
                        </div>

                        <div className="field">
                            <select 
                                name="rws_designation" 
                                id="rws_designation"
                                className="regular-text"
                                value={ inputs.rws_designation || "" }
                                onChange={ handleChange }
                            >
                                <option value=""> -- Select a role -- </option>
                                <option value="admin">Administrator</option>
                                <option value="developer">Developer</option>
                                <option value="analyst">Analyst</option>
                                <option value="support">Support</option>
                            </select>
                        </div>
                    </fieldset>
                </div>

                <div className="field-content rws_campus_single">
                    <fieldset>
                        <div className="field-data">
                            <h3 className="field-heading">Campus</h3>
                        </div>

                        <div className="field">
                            <label>
                                <input 
                                    type="radio" 
                                    name="rws_campus"
                                    value="none"
                                    checked={ inputs.rws_campus === "none" }
                                    onChange={ handleChange }
                                />
                                None
                            </label>
                            
                            <label>
                                <input 
                                    type="radio" 
                                    name="rws_campus"
                                    value="hq"
                                    checked={ inputs.rws_campus === "hq" }
                                    onChange={ handleChange }
                                />
                                Head Quarter
                            </label>

                            <label>
                                <input 
                                    type="radio" 
                                    name="rws_campus"
                                    value="swizz hall"
                                    checked={ inputs.rws_campus === "swizz hall" }
                                    onChange={ handleChange }
                                />
                                Switzerland Hall
                            </label>
                        </div>
                    </fieldset>
                </div>

                <input type="submit" className="button button-primary" value="Save Changes" />
            </form>
        </div>
    );
}
 
export default Fields;