<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
    <?php
    $this->load->view('require/head');
    ?>
    <body>
        <div style="font-size: 20em; padding-left: 1em; padding-bottom: 0;">
            401
        </div>
        <div class="text-danger" style="padding-top: 0px; padding-left: 20em;">
            Error: Unauthorized access! You don't have the correct permissions to access this page.
        </div>
    </body>
</html>
