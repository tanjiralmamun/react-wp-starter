<?php
namespace React_WP_Starter;

/**
 * Class constructor
 */
class Assets {
    /**
     * Class constructor
     */
    public function __construct() {
        if( is_admin() ) {
            add_action( 'admin_enqueue_scripts', [ $this, 'register' ] );
        } else {
            add_action( 'wp_enqueue_scripts', [ $this, 'register' ] );
        }
    }

    /**
     * Register the app styles and scripts
     * 
     * @return void
     */
    public function register() {
        $this->register_styles( $this->get_styles() );
        $this->register_scripts( $this->get_scripts() );
    }

    /**
     * Register styles
     * 
     * @param array $styles
     * 
     * @return void
     */
    private function register_styles( $styles ) {
        foreach( $styles as $handle => $style ){
            $deps = $style['deps'] ?? false;
        }

        wp_register_style( $handle, $style['src'], $deps, REACT_WP_STARTER_VERSION );
    }

    /**
     * Register scripts
     * 
     * @param array $scripts
     * 
     * @return void
     */
    private function register_scripts( $scripts ) {
        foreach( $scripts as $handle => $script ){
            $deps       = $script['deps'] ?? false;
            $version    = $script['version'] ?? REACT_WP_STARTER_VERSION;
            $in_footer  = $script['in_footer'] ?? false;
        }

        wp_register_script( $handle, $script['src'], $deps, $version, $in_footer );
    }

    /**
     * Get registered styles
     * 
     * @return array
     */
    public function get_styles() {
        $suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

        $styles = [
            'react-admin' => [
                'src' => REACT_WP_STARTER_ASSETS . '/css/admin'. $suffix .'.css'
            ]
        ];

        return $styles;
    }

    /**
     * Get registered scripts
     * 
     * @return array
     */
    public function get_scripts() {
        $suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

        $scripts = [
            'react-admin' => [
                'src'       => REACT_WP_STARTER_ASSETS . '/js/admin'. $suffix .'.js',
                'deps'      => [ 'wp-api-fetch' ],
                'in_footer' => true
            ]
        ];

        return $scripts;
    }

}