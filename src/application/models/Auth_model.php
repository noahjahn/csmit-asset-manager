<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Auth_model extends CI_Model {

    public function count_login_photos() {
        // SELECT COUNT(*) FROM `login_photos`
        return $this->db->count_all('login_photos');
    }

    public function get_login_photo($index) {
        // validate argument, check if it's an integer
        if (is_int($index)) {
            // SELECT `path` FROM `login_photos` ORDER BY `id` LIMIT $index,1;
            $this->db->select('path');
            $this->db->from('login_photos');
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
        $this->db->from('users');
        $this->db->where('email', $email);
        $this->db->limit(1);

        return $this->db->get()->result_array()[0]['password'];
    }

    public function set_user_password($email, $password) {
        // validate the arguments first

        $password = "C0ding is fun!";
        $hashed = password_hash($password, PASSWORD_DEFAULT); //https://www.php.net/manual/en/function.password-hash.php

        $data = array(
                'password' => $hashed,
        );

        $this->db->where('email', 'administrator@csmgroup.com');
        $this->db->update('users', $data);
        // Produces:
        //
        //      UPDATE mytable
        //      SET title = '{$title}', name = '{$name}', date = '{$date}'
        //      WHERE id = $id
    }

    public function is_valid_email($email) {
        // validate the argument

        $this->db->select('email');
        $this->db->from('users');
        $this->db->where('email', $email);
        $this->db->limit(1);

        return (! empty($this->db->get()->result())); // return true if not empty
    }

    public function add_user() {

    }

    public function get_user_attributes($email) {
        // validate the argument

        // SELECT `first_name`, `last_name` FROM `users` WHERE `email` = $email LIMIT 1
        $this->db->select('first_name, last_name');
        $this->db->from('users');
        $this->db->where('email', $email);
        $this->db->limit(1);

        return $this->db->get()->row();
    }
}

?>
