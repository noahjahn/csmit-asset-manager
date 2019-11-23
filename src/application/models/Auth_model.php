<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Auth_model extends CI_Model {

    private $users_table;

    public function __construct() {
        parent::__construct();
        $this->user_table = "users";
    }

    public function get_login_rules() {
        $form_rules = array (
            array (
                'field' => 'email',
                'label' => 'email',
                'rules' => 'required|valid_email|trim'
            ),
            array (
                'field' => 'password',
                'label' => 'password',
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
        $this->db->where('is_deleted', 0);
        $this->db->limit(1);

        return $this->db->get()->result_array()[0]['password'];
    }

    public function is_valid_email($email) {
        log_message('debug', 'Auth_model: is_valid_email - in function. Params: email='.$email);

        // validate the argument

        $this->db->select('email');
        $this->db->from($this->users_table);
        $this->db->where('email', $email);
        $this->db->where('is_deleted', 0);
        $this->db->limit(1);

        return (! empty($this->db->get()->result())); // return true if not empty
    }

}

?>
