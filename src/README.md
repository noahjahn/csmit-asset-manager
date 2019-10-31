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
### Local installation for development
To get an initial working copy of the project set up, clone the repository and run the docker initialize file:

```bash
$ git clone git@github.com:noahjahn/csmit-asset-manager.git
$ cd csmit-asset-manager/src
$ ./docker-init.sh
```

You should now be able to access the application at [http://localhost/](http://localhost)!!!

#### How does this work?
Docker will then setup the four images required to run this application. Once setup, the init file will automatically start the containers

| Composer | PHP-FPM Apache | PHPMyAdmin | MySQL 5.7 |
| -------- | -------------- | ---------- | --------- |

Every time docker is started, composer will install dependencies and MySQL will run all `.sql` files in the `/src/database/` directory

The application can now be viewed locally by navigating to [http://localhost](http://localhost) in your browser. *This is dependent on your version of Docker*

PHPMyAdmin can be accessed by navigating to [http://localhost:8080](http://localhost:8080). The local database credentials can be found in the `.env.docker` file:  
* username: **root**
* password: **Codingisfun!**

To stop the currently running containers
```bash
$ docker-compose down
```

Unless a new image is required to be built, the containers can be started with
```bash
$ docker-compose up -d
```

The `-d` flag runs the containers in detached mode: Run containers in the background, print new container names.

### Server installation for production
"The machine" will refer to the computer (VM or not) where the code and web server will live

Assumptions made
* a DNS Alias "A" record of choice (example: inventory.csmgroup.com) is pointing to the public IP address of the machine
* networking equipment is configured to allow all traffic over ports 80 (http) and 443 (https) to the machine
* networking equipment is configured to allow (restricted if desired) traffic over port 22 (SSH) to the machine
* the machine is running a fresh install of the Ubuntu (19.04) operating system
* the machine has a user who has private keys setup to authenticate with

Update Ubuntu's repository and upgrade current packages on Ubuntu

```bash
$ sudo apt update && sudo apt upgrade
```

Install the following packages: php, php-mbstring, php-mysqli, php-gd, apache2, mysql-server

```bash
$ sudo apt install php
$ sudo apt install php-mbstring
$ sudo apt-install php-mysqli
$ sudo apt-install php-gd
$ sudo apt-install apache2
$ sudo apt-install mysql-server
```

Create a new directory for the code base to live and change the owner of the folder to the user you would like to deploy code with (**ubuntu**) in this casae is the user name

```bash
$ mkdir /var/www/html/inventory.csmgroup.com
$ sudo chown ubuntu /var/www/html/inventory.csmgroup.com
```

Create a new virtual host in apache
```bash
$ cd /etc/apache2/sites-available
$ sudo touch inventory.csmgroup.com
$ sudo vim inventory.csmgroup.com
```

Paste the following into the file

```apache2
<VirtualHost *:80>
        ServerName inventory.csmgroup.com

        DocumentRoot /var/www/html/inventory.csmgroup.com/current

        CustomLog /var/log/httpd/inventory.csmgroup.com-access.log combined
        ErrorLog /var/log/httpd/inventory.csmgroup.com-error.log

        <Directory /var/www/html/inventory.csmgroup.com/current/>
                Options Indexes FollowSymLinks
                AllowOverride All
                Require all granted

                <Files ".env">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files "composer.json">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files "composer.lock">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files "composer.phar">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files "deploy.php">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files ".env.example">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files ".gitignore">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files "hosts.yml">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files "license.txt">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files "README.md">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files "web.config">
                        Order allow,deny
                        Deny from all
                </Files>

                <Files "uploads">
                        Order allow,deny
                        Deny from all
                </Files>

                <IfModule mod_rewrite.c>
                        RewriteEngine On
                        RewriteCond %{REQUEST_FILENAME} !-f
                        RewriteCond %{REQUEST_FILENAME} !-d
                        RewriteRule ^(.*)$ index.php/$1 [L]
                </IfModule>

        </Directory>

        <Directorymatch "^/.*/\.git/">
                Order deny,allow
                Deny from all
        </Directorymatch>

        <Directorymatch "/database/">
                Order deny,allow
                Deny from all
        </Directorymatch>

</VirtualHost>
```

Enable the new site in apache

```bash
$ sudo a2ensite inventory.csmgroup.com
```

Enable mod rewrite in apache

```bash
$ sudo a2enmod rewrite
```

Restart apache

```bash
$ sudo service apache2 restart
```

The server is setup and you're ready to deploy!! (see the deployment section of this guide)

#### Optional and recommended
Setup a free SSL certificate using [Certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-apache)

Add Certbot PPA

```bash
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository universe
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
```

Install Certbot

```bash
$ sudo apt-get install certbot python-certbot-apache
```

Run Certbot and follow the prompts

```bash
$ sudo certbot --apache
```

Test automatic renewal

```bash
$ sudo certbot renew --dry-run
```

## Environment
This repo depends on [vlucas/phpdotenv](https://github.com/vlucas/phpdotenv) to load environmental variables on startup. Make sure that you have a copy of `.env` with required variables set. You can find the template of variables required in `.env.docker`. The `docker-init.sh` file will copy the `.env.docker` to a `.env` file, so you don't have to do it initially

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

Install Deployer

```bash
curl -LO https://deployer.org/deployer.phar
mv deployer.phar /usr/local/bin/dep
chmod +x /usr/local/bin/dep
```

## Defining Remote Hosts
The 'hosts.yml' file lists remote hosts where Deployer can deploy the code. *This file should not include any secrets!* Configuration about hostname, user, key file, etc. should reside on the user's machine and be aliased to the hostname declared in `hosts.yml`.

You can read more about aliasing hostnames [here](https://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/).

Create an SSH alias for the `csmit.staging` and `csmit.production` on your computer to match our deployment setup

```bash
Host csmit.staging
  HostName xxx.xxx.xxx.xxx
  User pi
  IdentityFile /Users/noah/.ssh/keys/MyKey.pem
  ForwardAgent yes
  StrictHostKeyChecking no
  userKnownHostsFile /dev/null
```

Checkout out `develop` and deploy it to staging

```bash
$ git checkout develop
$ dep deploy staging
```
