<?php
include ("../../models/Users_model.php");

class UsersTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester;

    protected function _before()
    {
    }

    protected function _after()
    {
    }

    // tests
    public function test_insert()
    {
        // $ci =& get_instance();
        // $ci->load->model('Users_model');
        $user_model = new Users_model();
        $user = array(
            'first_name' => "Test",
            'last_name' => "User",
            'email' => "test.user@codeception.com",
            'password' => password_hash("CredentailsShouldBePrivate!", PASSWORD_DEFAULT), //https://www.php.net/manual/en/function.password-hash.php
            'role' => "role",
            'last_modified_by' => '1',
            'last_modified_time' => date('Y-m-d H:i:s'),
            'created_by' => '1',
            'created_time' => date('Y-m-d H:i:s')
        );
        $user_model->insert($user);
    }
}
