import React from "react";
import ReactDOM from "react-dom/client";
import Settings from "./Settings";

import '../styles/admin.scss';

const adminSettingsContainer = document.getElementById( 'react-admin' );
const reactAdmin = ReactDOM.createRoot( adminSettingsContainer );
reactAdmin.render( <Settings /> );