# Testing Standards

## Testing requirements:
* Using the Codeception webdriver:          https://codeception.com/docs/modules/WebDriver
* Selenium standalone server:               https://selenium.dev/downloads/
* For Chrome testing, the Chrome driver:    https://sites.google.com/a/chromium.org/chromedriver/getting-started
* For Firefox testing, the gecko driver:    https://github.com/mozilla/geckodriver

## Begin testing:
1. Start the Chrome webdriver:  
`./chromedriver`
2. Start the selenium server:  
`java -jar selenium-server-standalone-3.xx.xxx.jar`
3. Change directory to the application directory:  
`cd application`
4. Using Codception, run the tests locally with:
`php vendor/bin/codecept run acceptance --env local`


## Scope and Overview:
This document is for anyone testing, developing, or maintaining an instance of this IT Asset Manager.

## Approach:
The following testing approaches are used in order to automatically test various components of the IT Asset Manager

* **Installation Testing**: We tested the installation of the system with the client, to ensure they would be able to follow the steps outlined in the initial README file. For every question or hiccup the team ran into while installing, we wrote additional details about how to resolve the hiccup so there would be no further questions. Both of us on the team ran through the steps to make sure we understood the installation before having the client try to install.

* **Acceptance Testing**: Acceptance testing confirms that each feature of the system defined and required by the client has been met. Once all acceptance tests pass, initial development is complete. Acceptance testing is performed using *Codeception's Acceptance Testing*. Codeception uses selenium to run through a series of automated acceptance tests that allows us to check to make sure the front-end portion of our application is running to the client's standards. We also had the client run through manual tests to ensure they were happy with how the system looks, feels and works the way it was expected to. They documented every issue or hiccup they ran into for us to review. We are currently working on fixing small issues that were found during the client acceptance testing, and writing automated acceptance tests to ensure the issue doesn't come back.

* **Integration Testing**: Integration testing is done to test actual data entered into the system to ensure functionality and reliability of the system. Our integration testing is done automatically using Codeception's Integration testing framework. The Integration testing is done using a web driver that can navigate through a website, fill-out forms, and check to see if data is properly being added and integrated into the system. Similar to the acceptance tests from Codeception, these tests are run automatically and should be added whenever a new feature or bug is found in the system to ensure the system is working properly.

* **Usability Testing**: Usability testing was done before handing this project off to the client. We had close fiends and family members who are not very tech savvy test the system to see how they interacted with it. The users were not given any specific details on how the testing should be done, they were just told to add a new asset, add addition asset types, teams, manufacturers, and models, users, roles, and login photos to see if the application responded exactly how they would expect it to. Additionally, we also asked for feedback on the user experience of the system to see if there were any simple changes we could make to the interface for a more simple user experience.

* **System Testing**: System testing was done to test the entire process of adding an asset, editing an asset, deleting an asset, adding asset types, editing asset types, deleting asset types, adding users, editing users, deleting users, adding roles, editing roles, deleting roles, adding login photos, deleting login photos, and many more. These tests were not automated and were done continuously on local development environments using docker and on the staging site whenever a major update was warranted.

## Tools:
Unit and Acceptance testing implemented using PHPUnit and Codeception framework (Uses Selenium and the Chrome web driver).

* PHPUnit Website:              https://phpunit.de/
* Codeception Website:          https://codeception.com/
* Selenium web driver website:  https://selenium.dev/projects/
