# IT Asset Managaer

CSM Group - IT Asset Manager

The IT Asset Manager is used to track assets specifically related to how CSM Group IT operates.

## User Stories

* IT Managers and IT Technicians can securely enter in username and password to login
* IT Managers and IT Technicians can request a reset password via email
* IT Managers and IT Technicians can securely logout
* IT Managers and IT Technicians can reset other users’ passwords
* IT Managers and IT Technicians can set user permissions
* IT Managers and IT Technicians can upload new login photos
* IT Managers and IT Technicians can delete login photos
* IT Managers and IT Technicians can add new asset types
* IT Managers and IT Technicians can edit asset types
* IT Managers and IT Technicians can delete asset types
* IT Managers and IT Technicians can add new teams
* IT Managers and IT Technicians can edit teams
* IT Managers and IT Technicians can delete teams
* IT Managers and IT Technicians can add new manufacturers
* IT Managers and IT Technicians can edit manufacturers
* IT Managers and IT Technicians can delete manufacturers
* IT Managers and IT Technicians can add new models
* IT Managers and IT Technicians can edit models
* IT Managers and IT Technicians can delete models
* IT Managers and IT Technicians can add new assets
* IT Managers and IT Technicians can edit assets
* IT Managers and IT Technicians can delete assets
* IT Managers and IT Technicians can quickly search for assets
* IT Managers and IT Technicians can view return on an asset
* IT Managers and IT Technicians can create custom (queries) reports
* IT Managers and IT Technicians can view reports
* IT Managers and IT Technicians can export or download reports
* IT Managers and IT Technicians can delete reports
* IT Managers and IT Technicians can duplicate reports
* IT Managers and IT Technicians can edit reports
* IT Managers and IT Technicians can view the total number of assets in the system
* IT Managers and IT Technicians can view the total cost of the bill-back that should be expected
* IT Managers and IT Technicians can view the view the number of assets that are missing data fields
* IT Managers and IT Technicians can view how many assets are nearing end of life
* IT Managers and IT Technicians can set default page to load up after login
* IT Managers and IT Technicians can change the secondary color scheme of the site

# Getting Started

To run this code locally and begin developing you'll need to
* have [Docker](https://docker.com/) installed
    - or if you don't use Windows Pro or Mac OS [Docker Toolbox](https://docs.docker.com/toolbox/overview/) and [VirtualBox](https://www.virtualbox.org/)
* have a valid `.env` file

To run this code in a production or staging environment you'll need to
* have [PHP](https://php.net/) installed
* have [Composer](https://getcomposer.org/) installed and in your executable path in order to install dependencies
* be running a web server (we recommend [Apache](http://apache.org))
* be running MySQL
* have a valid `.env` file

## Installing

To get an initial working copy of the project set up, clone the repository and run the docker setup:

```bash
$ git clone git@github.com:noahjahn/csmit-asset-manager.git
$ cd csmit-asset-manager/src
$ ./docker-init.sh
```

Docker will then setup the four images required to run this application. Once setup, init file will automatically start the containers

| Composer | PHP-FPM Apache | PHPMyAdmin | MySQL 5.7 |
| -------- | -------------- | ---------- | --------- |

To stop the currently running containers
```bash
$ docker-compose down
```

Unless a new image is required to be built, the containers can be start with
```bash
$ docker-compose up -d
```

The `-d` flag runs the containers in detached mode: Run containers in the background, print new container names.

## Environment

This repo depends on [vlucas/phpdotenv](https://github.com/vlucas/phpdotenv) to load environmental variable on startup.  Make sure that you have a copy of `.env` with required variables set.  You can find the template of variables required in `.env.example`.  If you need a copy of `.env` please request one from the projects PM or Systems Analyst.

*The `.env` file _should not_ be checked into the repository!*

## Changes from CodeIgniter Standard
In order to set the environment (production, staging, testing, development) from the environment the `.env` file must be loaded at the top of `index.php`. You'll see this code block before the standard CodeIgniter code in `index.php`:

```php
/*
 *---------------------------------------------------------------
 * LOAD ENVIRONMENT
 *---------------------------------------------------------------
 *
 * Load environmental variables declared in .env using vlucas/phpdotenv
 * This is the very first thing we'll do to ensure that any external
 * config is honored during bootstrapping
 *
 * In order to use this package we're autoloading packages included
 * by composer here first.
 */

$root_path = dirname(__FILE__);
require_once($root_path.'/application/vendor/autoload.php');
$dotenv = Dotenv\Dotenv::create($root_path);
$dotenv->load();
```

# Deployment

This project uses [Deployer](https://deployer.org) to manage git-based deployments to remote servers. The deployment workflow is defined in Deployers CodeIgniter recipe, though we do add some configuration in `deploy.php`.

## Defining Remote Hosts
The 'hosts.yml' file lists remote hosts where Deployer can deploy the code. *This file should not include any secrets!* Configuration about hostname, user, key file, etc. should reside on the user's machine and be aliased to the hostname declared in `hosts.yml`.

You can read more about aliasing hostnames [here](https://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/).
