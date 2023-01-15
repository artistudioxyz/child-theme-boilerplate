<?php
/**
 * Parent Enqueue
 * Note: Remove this if your theme already has a parent enqueue
 */
function parent_enqueue() {
	wp_enqueue_style( 'parent-theme-css', get_stylesheet_directory_uri() . '/style.css', '', '', 'all' );
}
add_action( 'wp_enqueue_scripts', 'parent_enqueue', 10 );

/** Frontend Child Enqueue */
function frontend_child_enqueue() {
	wp_enqueue_style( 'ctb-css', get_stylesheet_directory_uri() . '/assets/build/css/frontend.min.css', '', '', 'all' );
}
add_action( 'wp_enqueue_scripts', 'frontend_child_enqueue', 10 );

/** Backend Child Enqueue */
function backend_child_enqueue() {
	wp_enqueue_style( 'ctb-css', get_stylesheet_directory_uri() . '/assets/build/css/backend.min.css', '', '', 'all' );
}
add_action( 'admin_enqueue_scripts', 'backend_child_enqueue', 10 );
