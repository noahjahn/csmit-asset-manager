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

    public function get_user_password($email) {
        // validate the argument

        // SELECT `password` FROM `users` WHERE `email` = $email LIMIT 1
        $this->db->select('password');
        $this->db->from('users');
        $this->db->where('email', $email);
        $this->db->limit(1);

        return $this->db->get()->row();
    }

    public function set_user_password($email, $password) {
        // validate the arguments first

        $data = array(
            'password' => $password
        );
        // UPDATE `users` SET `password`= 'Codingisfun!' WHERE `email`='administrator@csmgroup.com'
        // $this->db->set('password', $password);
        // $this->db->where('email', $email);
        // $this->db->update('users');

        // $this->db->set('password', $data['password']);
        // $this->db->where('email', $email);
        // $this->db->update('users');



        $this->db->where('email', $email);
        $this->db->update('users', $data);
// Produces:
//
//      UPDATE mytable
//      SET title = '{$title}', name = '{$name}', date = '{$date}'
//      WHERE id = $id

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
