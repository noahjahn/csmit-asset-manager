<?php

class LoginCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    // tests
    public function LoginFormRequried(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->click('Login');
        $I->see('The Email field is required.');
        $I->see('The Password field is required.');
    }

    public function LoginFormInvalidEmail(AcceptanceTester $I)
    {
        // $I->amOnPage('/');
        // $I->fillField('email', 'invalid');
        // $I->click('Login');
        // $I->see('Please include an \'@\' in the email address. \'invalid\' is missing an \'@\'.');
    }
}
