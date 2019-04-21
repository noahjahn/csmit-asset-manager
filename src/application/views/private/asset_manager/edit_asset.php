<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
    <?php $this->load->view('require/head'); ?>

    <body>
        <div class="d-flex" id="wrapper">
            <?php $this->load->view('require/navbar'); ?>
            <div id="page-content-wrapper">
                <h5>Username</h5>
                <input type="text" name="username" value="" size="50" />

                <h5>Password</h5>
                <input type="text" name="password" value="" size="50" />

                <h5>Password Confirm</h5>
                <input type="text" name="passconf" value="" size="50" />

                <h5>Email Address</h5>
                <input type="text" name="email" value="" size="50" />

                <div><input type="submit" value="Submit" /></div>

                </form>
            </div>
            <!-- /#page-content-wrapper -->
        </div>
        <!-- /#wrapper -->
    </body>
</html>
