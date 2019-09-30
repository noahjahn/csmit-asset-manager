<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Auth_model extends CI_Model {

    private $login_photos_table;
    private $users_table;

    public function __construct() {
        parent::__construct();
        $this->login_photos_table = 'login_photos';
        $this->users_table = 'users';
    }

    public function count_login_photos() {
        // SELECT COUNT(*) FROM `login_photos`
        return $this->db->count_all($this->login_photos_table);
    }

    public function get_login_photo($index) {
        // validate argument, check if it's an integer
        if (is_int($index)) {
            // SELECT `path` FROM `login_photos` ORDER BY `id` LIMIT $index,1;
            $this->db->select('path');
            $this->db->from($this->login_photos_table);
            $this->db->order_by('id');
            $this->db->limit(1, $index-1);
            $query = $this->db->get();

            // The result is an array, even though it's only one, so clean it up a little before returning.
            return $query->result_array()[0]['path'];
        } else {
            // show error
        }
    }

    public function get_login_rules() {
        $form_rules = array (
            array (
                'field' => 'login_email',
                'label' => 'Email',
                'rules' => 'required|valid_email|trim'
            ),
            array (
                'field' => 'login_password',
                'label' => 'Password',
                'rules' => 'required|trim'
            )
        );

        return $form_rules;
    }

    public function get_user_password($email) {
        // validate the argument

        // SELECT `password` FROM `users` WHERE `email` = $email LIMIT 1
        $this->db->select('password');
        $this->db->from($this->users_table);
        $this->db->where('email', $email);
        $this->db->where('is_deleted', 1);
        $this->db->limit(1);

        return $this->db->get()->result_array()[0]['password'];
    }

    public function set_user_password($email, $password) {
        // validate the arguments first
        $hashed = password_hash($password, PASSWORD_DEFAULT); //https://www.php.net/manual/en/function.password-hash.php

        $data = array(
                'password' => $hashed,
        );

        $this->db->where('email', '$email');
        $this->db->update($this->users_table, $data);
    }

    public function get_user_id($email) {
        $this->db->select('id');
        $this->db->from($this->users_table);
        $this->db->where('email', $email);
        $this->db->where('is_deleted', 1);
        $this->db->limit(1);

        return $this->db->get()->result_array()[0]['id'];
    }

    public function is_valid_email($email) {
        // validate the argument

        $this->db->select('email');
        $this->db->from($this->users_table);
        $this->db->where('email', $email);
        $this->db->where('is_deleted', 1);
        $this->db->limit(1);

        return (! empty($this->db->get()->result())); // return true if not empty
    }

    public function add_user() {

    }

    public function get_user_attributes_by_email($email) {
        // validate the argument

        // SELECT `first_name`, `last_name` FROM `users` WHERE `email` = $email LIMIT 1
        $this->db->select('id, first_name, last_name, last_login,
        last_modified_by, last_modified_time, created_by, created_time');
        $this->db->from($this->users_table);
        $this->db->where('email', $email);
        $this->db->where('is_deleted', 1);
        $this->db->limit(1);

        return $this->db->get()->result_array()[0];
    }

    public function set_user_token($email, $encrypted_token) {
        $session_token = base64_decode($encrypted_token);
        $this->db->set('session_token', password_hash($session_token, PASSWORD_DEFAULT));
        $this->db->where('id', $this->get_user_attributes_by_email($email)['id']);
        return $this->db->update($this->users_table);
    }

    public function set_last_login($email) {
        $this->db->set('last_login', date('Y-m-d h:i:s'));
        $this->db->where('email', $email);
        $this->db->where('is_deleted', 1);
        return $this->db->update($this->users_table);
    }

}

?>
