<?php

class SettingsCest
{
    private $valid_email;
    private $valid_password;

    public function _before(AcceptanceTester $I)
    {
        $this->valid_email = 'administrator@csmgroup.com';
        $this->valid_password = 'C0ding is fun!';

    }

    public function Settings(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->fillField('email', $this->valid_email);
        $I->fillField('password', $this->valid_password);
        $I->click('Login');
        $I->see('Logout');
        $I->click('Settings');
        $I->amOnPage('/settings');
        $I->see('Settings');
    }

    public function SettingsAssetTypesInvalid(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->fillField('email', $this->valid_email);
        $I->fillField('password', $this->valid_password);
        $I->click('Login');
        $I->see('Logout');
        $I->click('Settings');
        $I->amOnPage('/settings');
        $I->see('Settings');
        $I->see('Asset Types');
        $I->click('Add Asset Type');
        $I->see('Add Assset Type');
        $I->see('Name');
        $I->see('Rate');
        $I->fillField('name', "Monitors");
        $I->fillField('rate', "20");
        $I->click('Save');
        $I->see('The name field must contain a unique value.');
        $I->click('Cancel');
    }

    public function SettingsAssetTypesValid(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->fillField('email', $this->valid_email);
        $I->fillField('password', $this->valid_password);
        $I->click('Login');
        $I->see('Logout');
        $I->click('Settings');
        $I->amOnPage('/settings');
        $I->see('Settings');
        $I->see('Asset Types');
        $I->click('Add Asset Type');
        $I->see('Add Asset Type');
        $I->see('Name');
        $I->see('Rate');
        $I->fillField('name', "Codeception");
        $I->fillField('rate', "20");
        $I->click('Save');
        $I->see('Settings');
    }

    public function SettingsTeamsInvalid(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->fillField('email', $this->valid_email);
        $I->fillField('password', $this->valid_password);
        $I->click('Login');
        $I->see('Logout');
        $I->click('Settings');
        $I->amOnPage('/settings');
        $I->see('Settings');
        $I->see('Teams');
        $I->click('Add Team');
        $I->see('Add Team');
        $I->see('Name');
        $I->fillField('name', "Zulu");
        $I->see('The name field must contain a unique value.');
        $I->click('Cancel');
        $I->see('Settings');
    }

    public function SettingsTeamsValid(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->fillField('email', $this->valid_email);
        $I->fillField('password', $this->valid_password);
        $I->click('Login');
        $I->see('Logout');
        $I->click('Settings');
        $I->amOnPage('/settings');
        $I->see('Settings');
        $I->see('Teams');
        $I->click('Add Team');
        $I->see('Add Team');
        $I->see('Name');
        $I->fillField('name', "Codeception");
        $I->click('Save');
        $I->see('Settings');
    }
}
