<?php

class LoginCest
{
    private $invalid_email;
    private $invalid_password;
    private $valid_email;
    private $valid_password;

    public function _before(AcceptanceTester $I)
    {
        $this->invalid_email = 'email@email.com';
        $this->invalid_password = 'password';
        $this->valid_email = 'administrator@csmgroup.com';
        $this->valid_password = 'C0ding is fun!';

    }

    // tests
    public function LoginFormRequried(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->click('Login');
        $I->see('The Email field is required.');
        $I->see('The Password field is required.');
    }

    public function LoginFormInvalidLogin(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->fillField('email', $this->invalid_email);
        $I->fillField('password', $this->invalid_password);
        $I->click('Login');
        $I->see('Invalid username or password');
        $I->seeInField('email', $this->invalid_email);
    }

    public function LoginFormValidEmailInvalidPassword(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->fillField('email', $this->valid_email);
        $I->fillField('password', $this->invalid_password);
        $I->click('Login');
        $I->see('Invalid username or password');
        $I->seeInField('email', $this->valid_email);
    }

    public function Login(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->fillField('email', $this->valid_email);
        $I->fillField('password', $this->valid_password);
        $I->click('Login');
        $I->see('Logout');
    }
}
