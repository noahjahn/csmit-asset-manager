<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('set_last_modified_by')) {
    function set_last_modified_by($id, $user_id, $table) {
        $ci =& get_instance();
        $ci->db->set('last_modified_by', $user_id);
        $ci->db->where('id', $id);
        return $ci->db->update($table);
    }
}

if ( ! function_exists('set_last_modified_time')) {
    function set_last_modified_time($id, $table) {
        $ci =& get_instance();
        $ci->db->set('last_modified_time', date("Y-m-d H:i:s")); // 2019-08-19 02:19:39
        $ci->db->where('id', $id);
        return $ci->db->update($table);
    }
}

if ( ! function_exists('set_created_by')) {
    function set_created_by($id, $user_email, $table) {
        $ci =& get_instance();
        $ci->db->set('created_by', $user_id);
        $ci->db->where('id', $id);
        return $ci->db->update($table);
    }
}

if ( ! function_exists('set_created_time')) {
    function set_created_time($id, $table) {
        $ci =& get_instance();
        $ci->db->set('last_modified_time', date("Y-m-d H:i:s")); // 2019-08-19 02:19:39
        $ci->db->where('id', $id);
        return $ci->db->update($table);
    }
}

if ( ! function_exists('record_exists')) {
    function record_exists($id, $table) {
        $ci =& get_instance();
        $ci->db->where('id', $id);
        $query = $ci->db->get($table);
        if ($query->num_rows() > 0){
            return true;
        }
        else {
            return false;
        }
    }
}

if ( ! function_exists('record_is_active')) {
    function record_is_active($id, $table) {
        $ci =& get_instance();
        $ci->db->where('id', $id);
        $query = $ci->db->get($table);
        if ($query->num_rows() == 1) {
            if ($query->row()->is_active == 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

?>
