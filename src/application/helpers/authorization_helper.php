<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('is_authorized')) {
    function is_authorized($user_role_id, $page) {
        $ci =& get_instance();
        $ci->load->model('Roles_model');
        switch ($ci->Roles_model->get_page_access($user_role_id, $page)) {
            case R:
                return TRUE;
            case W:
                return TRUE;
            case RW:
                return TRUE;
            default:
                return FALSE;
        }
    }
}

if ( ! function_exists('has_write_access')) {
    function has_write_access($user_role_id, $page) {
        $ci =& get_instance();
        $ci->load->model('Roles_model');
        switch ($ci->Roles_model->get_page_access($user_role_id, $page)) {
            case W:
                return TRUE;
            case RW:
                return TRUE;
            default:
                return FALSE;
        }
    }
}

if ( ! function_exists('get_all_page_access')) {
    function get_all_page_access($user_role_id) {
        $ci =& get_instance();
        $ci->load->model('Roles_model');
        $page_access = array();
        foreach (get_pages() as $page) {
            $page_access[$page] = $ci->Roles_model->get_page_access($user_role_id, $page);
        }
        return $page_access;
    }
}

if ( ! function_exists('get_pages')) {
    function get_pages() {
        return array(
            'dashboard',
            'asset_manager',
            'reports',
            'asset_groups',
            'users',
            'roles',
            'login_photos',
            'software_assets'
        );
    }
}
