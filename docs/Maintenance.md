# Maintenance

## Server
Packages installed on the server should be periodically checked for updates. Updates can be installed on linux with

```bash
$ sudo apt-get update && sudo apt-get upgrade
```

Major versions of PHP should be tested in a testing and staging environment before deploying to production

Major versions of MySQL should be tested in a testing and staging environment before deploying to production

Major versions of Apache should be tested in a testing and staging environment before deploying to production

## Application
PHP Packages are installed with `composer` and should be updated periodically

```bash
$ cd /var/www/html/inventory.csmgroup.com
$ composer update
```

The following JavaScript Libraries should be periodically tested for updates:
* JQuery
* DataTables
* Semantic UI - dropdown and transition

To apply updates to JQuery, update the following url in the `/src/application/views/require/head.php` file
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
```

To apply updates to DataTables, download the latest version from their [website](https://datatables.net/). Replace the `datatables.js` file with the newly downloaded one in `/src/application/js/DataTables/` directory

To apply updates to the Semantic UI dropdown and transition modules, download the latest version from their [website](https://semantic-ui.com/). Replace the `dropdown.css`, `dropdown.js`, `transition.css`, and `transition.js` files in the `/src/application/libraries/semantic` directory
