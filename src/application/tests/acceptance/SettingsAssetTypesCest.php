<?php

include_once 'LoginCest.php';

class SettingsAssetTypesCest
{

    public function _before(AcceptanceTester $I, \Page\Acceptance\LoginCept $LoginPage)
    {
        $LoginPage->Login($I);
    }

    // tests
    public function Settings(AcceptanceTester $I)
    {
        $I->amOnPage('/settings');
        $I->click('.asset-manager-link');
        $I->see("Asset Types", "h5");
    }
}
