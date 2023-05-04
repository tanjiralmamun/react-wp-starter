<?php
namespace React_WP_Starter;

/**
 * API Class
 */
class Api {
    /**
     * All Api Classes
     * 
     * @var array
     */
    protected $classes;

    /**
     * Class constructor
     */
    public function __construct() {
        $this->classes = [
            Api\Settings::class
        ];
        add_action( 'rest_api_init', [ $this, 'register_apis' ] );
    }

    /**
     * Register APIs
     * 
     * @return void
     */
    public function register_apis() {
        foreach( $this->classes as $class ){
            $object = new $class;
            $object->register_routes();
        }
    }
}