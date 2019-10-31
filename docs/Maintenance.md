# IT Asset Managaer

CSM Group - IT Asset Manager

The IT Asset Manager is used to track assets specifically related to how CSM Group IT operates.

# Getting Started

To run this code you'll need to
* have [PHP](https://php.net/) installed
* have [Composer](https://getcomposer.org/) installed and in your executable path in order to install dependencies
* be running MySQL
* have a valid `.env` file

## Installing

### Local setup

To get a working copy of the project set up, clone the repository and install dependencies:

```bash
$ git clone git@github.com:noahjahn/csmit-asset-manager.git
$ composer install
```

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
