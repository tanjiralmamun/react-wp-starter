<?php
namespace React_WP_Starter\Api;

use WP_REST_Server;

/**
 * Settings API Class
 */
class Settings extends Base {

    /**
     * Class constructor
     */
    public function __construct() {
        $this->namespace = 'react-wp-starter/v1';
        $this->rest_base = 'settings';
    }

    /**
     * Register the routes for the controller object
     * 
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/'. $this->rest_base,
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items' ],
                    'permission_callback' => [ $this, 'admin_permission_check' ],
                    'args'                => []
                ],
                [
                    'methods'             => WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'update_items' ],
                    'permission_callback' => [ $this, 'admin_permission_check' ],
                    'args'                => []
                ],
                'schema' => [ $this, 'get_item_schema' ]
            ]
        );
    }

    /**
     * Retrives a list of items
     * 
     * @param WP_Rest_Request $request
     * 
     * @return WP_Rest_Response|WP_Error
     */
    public function get_items( $request ) {
        $country = get_option( 'react_wp_country' );
        
        $response = [ 
            'country' => $country 
        ];

        return rest_ensure_response( $response );
    }

    /**
     * Update items from the collection
     * 
     * @param WP_Rest_Request $request
     * 
     * @return WP_Error|WP_Rest_Response
     */
    public function update_items( $request ) {
        $country = $request->get_param( 'country' );

        //save the value
        update_option( 'react_wp_country', $country, false );

        $request->set_param( 'context', 'edit' );

        return $this->get_items( $request );
    }

    /**
     * Retrive the settings schema, conforming to JSON schema
     * 
     * @return array
     */
    public function get_item_schema() {
        if( $this->schema ){
            return $this->add_additional_fields_schema( $this->schema );
        }

        $schema = [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'settings',
            'type'       => 'object',
            'properties' => [
                'country' => [
                    'description' => ( 'Name of the country' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'arg_options' => [
                        'sanitize_callback' => 'sanitize_text_field'
                    ]
                ]
            ]
        ];

        $this->schema = $schema;

        return $this->add_additional_fields_schema( $this->schema );
    }
}