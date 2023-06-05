import React, { useEffect, useState } from "react";
import apiFetch from '@wordpress/api-fetch';

const Fields = ({ fieldsData }) => {
    const [ inputs, setInputs ] = useState({});

    useEffect( () => {
        setInputs( fieldsData );
    }, [ fieldsData ] );

    const handleChange = event => {
        const { name, value, type, checked }  = event.target;

        setInputs( values => ( {
                    ...values, 
                    [name]: type === 'checkbox' ? checked : value
                } 
            ) 
        );
    };

    const handleSubmit = e => {
        e.preventDefault();

        apiFetch( {
            path: '/react-wp-starter/v1/settings',
            method: 'POST',
            data: { inputs }
        } )
        .then( resp => {
            setInputs( resp )
            console.log( resp )
        } )
        .catch( err => {
            console.log( err );
        } )
    };

    const radioOptions = [
        { value: 'none', label: "None" },
        { value: 'hq', label: "Head Quarter" },
        { value: 'swizz hall', label: "Switzerland Hall" },
    ];

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
                                value={ inputs.rws_street || '' }
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
                                value={ inputs.rws_state || '' }
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
                                value={ inputs.rws_country || '' }
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
                                value={ inputs.rws_about || '' }
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
                                value={ inputs.rws_designation || '' }
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
                            { radioOptions.map( option => (
                                <label key={ option.value }>
                                    <input 
                                        type="radio"
                                        name="rws_campus"
                                        value={ option.value }
                                        checked={ inputs.rws_campus === option.value }
                                        onChange={ handleChange }
                                    />
                                    { option.label }
                                </label>
                            ) ) }
                        </div>
                    </fieldset>
                </div>

                <input type="submit" className="button button-primary" value="Save Changes" />
            </form>
        </div>
    );
}
 
export default Fields;