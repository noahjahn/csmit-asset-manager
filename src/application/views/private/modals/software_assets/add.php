<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-semantic.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/dropdown.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/transition.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/custom.css"/>
<script src="<?php echo base_url(); ?>assets/libraries/semantic/dropdown.js"></script>
<script src="<?php echo base_url(); ?>assets/libraries/semantic/transition.js"></script>

<div class="modal" id="add-software-asset" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-add-asset" class="modal-title">Add Software Asset</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-add-asset">
                <?php echo form_open(current_url(), array('id' => 'add-software-asset-form', 'name' => 'add-software-asset-form', 'autocomplete' => 'off')); ?>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Name<span class="required"> *</span></label>
                            <input type="text" id="add-software-asset-name" name="name" class="form-control">
                            <div id="add-software-asset-name-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>Username</label>
                            <input type="text" id="add-software-asset-username" name="username" class="form-control" autocomplete="off">
                            <div id="add-software-asset-username-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Password</label>
                            <input type="password" id="add-software-asset-password" name="password" class="form-control" autocomplete="new-password">
                            <div id="add-software-asset-password-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>Login URL</label>
                            <input type="text" id="add-software-asset-login-url" name="login_url" class="form-control">
                            <div id="add-software-asset-login-url-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Owner</label>
                            <input type="text" id="add-software-asset-owner" name="owner" class="form-control" value="">
                            <div id="add-software-asset-owner-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>Renewal Date</label>
                            <input type="date" id="add-software-asset-renewal-date" name="renewal_date" class="form-control" value="">
                            <div id="add-software-asset-renewal-date-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Renewal Type</label>
                            <select type="text" id="add-software-asset-renewal-type" name="renewal_type_id" class="form-control ui search dropdown" value="">
                                <?php
                                    foreach($renewal_types as $renewal_type) {
                                        $id = $renewal_type['id'];
                                        $name = $renewal_type['name'];
                                        echo "<option value='$id'>$name</option>";
                                    }
                                ?>
                            </select>
                            <div id="software-asset-renewal-type-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>Cost</label>
                            <input id="add-sofware-asset-cost" name="cost" class="form-control" value="">
                            <div id="add-sofware-asset-cost-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <!-- TODO: determine if representative contact should be a separate table -->
                            <label>Representative Contact</label>
                            <input type="text" id="add-software-asset-representative-contact" name="representative_contact" class="form-control" value="">
                            <div id="add-software-asset-representative-contact-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>License key</label>
                            <input type="text" id="add-software-asset-license-key" name="licence_key" class="form-control" value="">
                            <div id="add-software-asset-license-key-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Notes</label>
                            <textarea class="form-control textarea" id="add-software-asset-notes" name="notes" rows="2" value=""></textarea>
                            <div id="add-software-asset-notes-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-add-asset" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="asset-add-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>
