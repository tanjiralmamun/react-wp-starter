<?php
namespace React_WP_Starter\Api;

use WP_REST_Controller;

/**
 * Base API Class
 */
class Base extends WP_REST_Controller {
    /**
     * Permission check
     * 
     * @param WP_Rest_Request $request
     * 
     * @return WP_Error|bool
     */
    public function admin_permission_check( $request ) {
        return current_user_can( 'manage_options' );
    }
}