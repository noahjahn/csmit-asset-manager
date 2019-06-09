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
}

?>
