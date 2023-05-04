<?php
/**
 * Plugin Name:       React WP Starter
 * Plugin URI:        https://github.com/tanjiralmamun/react-wp-starter
 * Description:       A WordPress React.js Starter plugin
 * Version:           0.1
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Author:            Tanjir Al Mamun
 * Author URI:        https://tanjirsdev.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://example.com/my-plugin/
 * Text Domain:       react-wp-starter
 * Domain Path:       /languages
 */

if( ! defined( 'ABSPATH' ) ){
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * The main plugin class
 */
final class React_WP_Starter {
    /**
     * Plugin version
     * 
     * @var string
     */
    const version = '0.1';

    /**
     * Container to hold various class instances
     * 
     * @var array
     */
    private $container = [];

    /**
     * Class constructor
     */
    private function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    /**
     * Initializes a singleton instance
     * 
     * @return \React_WP_Starter
     */
    public static function init() {
        static $instance = false;

        if( ! $instance ) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Define the required plugin constants
     * 
     * @return void
     */
    public function define_constants() {
        define( 'REACT_WP_STARTER_VERSION', self::version );
        define( 'REACT_WP_STARTER_FILE', __FILE__ );
        define( 'REACT_WP_STARTER_PATH', __DIR__ );
        define( 'REACT_WP_STARTER_URL', plugins_url( '', REACT_WP_STARTER_FILE ) );
        define( 'REACT_WP_STARTER_ASSETS', REACT_WP_STARTER_URL . '/assets' );
    }

    /**
     * Initialize plugin classes
     * 
     * @return void
     */
    public function init_plugin() {
        $container['assets']    = new React_WP_Starter\Assets();
        $container['api']       = new React_WP_Starter\Api();

        if( is_admin() ) {
            $container['admin'] = new React_WP_Starter\Admin\Manager();
        }
        
    }

    /**
     * Do stuff upon plugin activation
     * 
     * @return void
     */
    public function activate() {
        $installed = get_option( 'react_wp_starter_installed' );

        if( ! $installed ) {
            update_option( 'react_wp_starter_installed', time() );
        }

        update_option( 'react_wp_starter_version', REACT_WP_STARTER_VERSION );
    }
}

/**
 * Initialize the main plugin
 * 
 * @return \React_WP_Starter
 */
function react_wp_starter() {
    return React_WP_Starter::init();
}

// kick-off the plugin
react_wp_starter();