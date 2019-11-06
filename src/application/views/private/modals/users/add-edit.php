<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css"/>

<div id="add-user" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-add-user" class="modal-title">Add User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-add-user">
                <?php echo form_open(current_url(), array( 'id' => 'add-user-form', 'name' => 'add-user-form')); ?>
                    <div class="form-group">
                        <label>First Name<span class="required"> *</span></label>
                        <input id="first-name" name="first-name" class="form-control" value="<?php set_value('first_name'); ?>">
                        <div id="first-name-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Last Name<span class="required"> *</span></label>
                        <input id="last-name" name="last-name" class="form-control" value="<?php set_value('last_name'); ?>">
                        <div id="last-name-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Email<span class="required"> *</span></label>
                        <input id="email" name="email" class="form-control" value="<?php set_value('email'); ?>">
                        <div id="email-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Password<span class="required"> *</span></label>
                        <input id="password" type="password" name="password" class="form-control" value="<?php set_value('password'); ?>">
                        <div id="password-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Password Confirm<span class="required"> *</span></label>
                        <input id="password-confirm" type="password" name="password-confirm" class="form-control" value="<?php set_value('password_confirm'); ?>">
                        <div id="password-confirm-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Role<span class="required"> *</span></label>
                        <input id="role" name="role" class="form-control" value="<?php set_value('role'); ?>">
                        <div id="role-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-add-user" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="user-add-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>

<div id="edit-user" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-edit-user" class="modal-title">Edit User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="modal-body-edit-user" class="modal-body">
                <?php echo form_open(current_url(), array( 'id' => 'edit-user-form', 'name' => 'edit-user-form')); ?>
                    <div class="form-group">
                        <label>Name</label>
                        <input id="name" name="name" class="form-control" value="<?php set_value('name'); ?>">
                        <div id="name-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label for="rate">Rate</label>
                        <input id="rate" name="rate" type="number" step=".01" class="form-control" value="<?php set_value('rate'); ?>">
                        <div id="rate-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-edit-user" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input id="modal-submit-edit-user" type="submit" name="user-edit-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>
